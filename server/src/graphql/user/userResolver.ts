import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ApolloError } from "apollo-server-express";
import Context from "../../interfaces/context";
import User from './user';
import UserInput from './userInput';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Resolver()
class UserResolver {

    @Query(() => [User])
    async users(@Ctx() context: Context) {

        try {
            const users = await context.prisma.user.findMany();
            return users;

        } catch (error) {
            throw new ApolloError('Error while fetching user: ' + error, 'INTERNAL_SERVER_ERROR');
        }
    }

    @Mutation(() => User)
    async saveUser(@Arg("input", () => UserInput) input: UserInput, @Ctx() context: Context) {

        try {

            if (!input.email) {
                throw new Error('Email is mandatory');
            }

            if (!input.password) {
                throw new Error('Password is mandatory');
            }

            const userDB = await context.prisma.user.findFirst({
                where: { email: input.email },
            });

            if (userDB) {
                throw new Error('An user with this email already exists');
            }

            const password = await bcrypt.hash(input.password, 8);

            const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : 'jwtKey';
            const token = jwt.sign({ email: input.email }, jwtKey);

            const user = await context.prisma.user.create({
                data: {
                    id: input.id,
                    email: input.email,
                    name: input.name,
                    password,
                    token
                }
            });

            return user;

        } catch (error) {
            throw new ApolloError('Error while saving user: ' + error.message, 'INTERNAL_SERVER_ERROR');
        }
    }
}

export default UserResolver