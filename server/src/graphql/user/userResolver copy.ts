import { user } from ".prisma/client";
import { ApolloError } from "apollo-server-errors";
import { GraphQLResolveInfo } from "graphql";
import { Resolvers, User, UserInput } from "../generated/graphql-server";
import userSchema from "./userSchema";
import UserInterface from '../../interfaces/user';
import Context from "../../interfaces/context";
// import { Resolver } from "dns";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userResolver: Resolvers<Context> = {


    // login: async ({ loginInput }) => {

    //     try {

    //         const user = await User.findOne({ email: loginInput.email });

    //         if (!user) {
    //             throw new Error('Invalid Credentials');
    //         }

    //         const isPasswordRight = await bcrypt.compare(loginInput.password, user.password)

    //         if (!isPasswordRight) {
    //             throw new Error('Invalid Credentials');
    //         }

    //         const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });

    //         return { userId: user.id, token, tokenExpiration: 1 };

    //     } catch (error) {
    //         console.log('Error while trying to login: ' + error);
    //     }
    // },



    Query: {

        users: async (parent, args, context): Promise<User[]> => {
            try {
                const users: User[] = await context.prisma.user.findMany();
                return users;

            } catch (error) {
                throw new ApolloError('Error while fetching user', 'INTERNAL_SERVER_ERROR');
            }
        },
    },

    Mutation: {
        createUser: async (parent, { userInput }, context): Promise<User> => {
            try {

                // let userDB = await User.findOne({ email: props.userInput.email });

                // if (userDB) {
                //     throw new Error('Us er already exists');
                // }

                // const user = new User({
                //     ...props.userInput,
                // });
                // let user: UserInterface;

                // const user2: UserInterface = { ...userInput };
                // const user = await context.prisma.user.create({
                //     data: { ...userInput }

                // });
                const user = await context.prisma.user.create({
                    data: {
                        name: userInput && userInput.name ? userInput.name : '',
                        email: userInput && userInput.email ? userInput.email : '',
                        password: userInput && userInput.password ? userInput.password : '',
                        profile: {
                            connect: {
                                id: userInput && userInput.profile?.id ? userInput.profile.id : 0,
                            }
                        },
                    }
                });

                return user;
            } catch (error) {
                throw new ApolloError('Error while creating user', 'INTERNAL_SERVER_ERROR');
            }
        },
    },
}

// user: async (props) => {
//     try {

//         let user = await User.findOne({ ...props.userInput }).populate('events');
//         return user;
//     } catch (error) {
//         console.log('Error while trying to fetch users: ' + error);
//     }
// },

// createUser: async (parent, args, context, info): Promise<User> => {
//     try {

// let userDB = await User.findOne({ email: props.userInput.email });

// if (userDB) {
//     throw new Error('Us er already exists');
// }

// const user = new User({
//     ...props.userInput,
// });

//         const user: User = context.prsma
//         return { ...userDB._doc, password: null };
//     } catch (error) {
//         console.log('Error while trying to create user: ' + error);
//     }
// },


export default userResolver;