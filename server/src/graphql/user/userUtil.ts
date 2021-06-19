import { UserInputError } from "apollo-server-errors";
import Context from "../../interfaces/context";
import { UserInput } from "../generated/graphql-server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';


export const validate = async (userInput: UserInput, context: Context) => {

    if (userInput.id && context.user && userInput.id !== context.user.id) {
        throw new UserInputError('You can only update your own user');
    }

    if (!userInput?.name) {
        throw new UserInputError('Name is mandatory');
    }

    if (!userInput?.email) {
        throw new UserInputError('Email is mandatory');
    }

    if (!userInput.password) {
        throw new UserInputError('Password is mandatory');
    }

    const userDB = await context.prisma.user.findUnique({
        where: { email: userInput.email },
    });

    if (userDB && userDB.id !== userInput.id) {
        throw new UserInputError('Another user with this email already exists');
    }
}

export const hashPassword = async (password: string) => {

    if (password && password.length < 4) {
        throw new UserInputError('Password should have at least 4 characters');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword;
}

export const generateToken = async (email: string, userId: string, context: Context) => {

    const jwtKey = process.env.JWT_KEY!;
    const token = jwt.sign({ email, userId }, jwtKey, { expiresIn: '1h' });

    await context.prisma.user.update({
        data: {
            token
        },
        where: {
            id: userId
        }

    })

    return token;
}

export const sendPasswordEmail = async (email: string, context: Context) => {


    const user = await context.prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new UserInputError('Email not found');
    }

    const code = Math.round(100000 + Math.random() * 900000);

    sgMail.setApiKey(process.env.SENDGRIP_API_KEY!);
    await sgMail.send({
        to: email,
        from: 'salesbass@gmail.com',
        subject: 'Outdoors King - Password Reset',
        text: `Hello ${user?.name ? user.name : 'user'}.Your code to reset your password is ${code}.`
    });

    await context.prisma.passwordReset.upsert({
        create: {
            userId: user.id,
            code
        },
        update: {
            code
        },
        where: {
            userId: user.id
        }
    });
}