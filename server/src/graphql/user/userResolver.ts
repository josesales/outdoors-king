import { ApolloError, UserInputError } from "apollo-server-errors";
import { validate, hashPassword, generateToken, sendPasswordEmail } from "./userUtil";
import { Resolvers, User, Auth } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import bcrypt from 'bcryptjs';

const userResolver: Resolvers<Context> = {

    Query: {

        users: async (parent, args, context): Promise<User[]> => {
            try {

                const users: User[] = await context.prisma.user.findMany({
                    include: {
                        profile: true
                    }
                });

                return users;
            } catch (error) {
                throw new ApolloError('Error while fetching user', 'INTERNAL_SERVER_ERROR');
            }
        },

        login: async (parent, { loginInput }, context): Promise<Auth> => {
            try {

                if (!loginInput) {
                    throw new UserInputError('Please provide inputs');
                }

                const user = await context.prisma.user.findUnique({
                    where: {
                        email: loginInput?.email
                    },
                    include: {
                        profile: true
                    }
                });

                if (!user) {
                    throw new UserInputError('Invalid Credentials');
                }

                const isPasswordRight = await bcrypt.compare(loginInput.password, user.password)

                if (!isPasswordRight) {
                    throw new UserInputError('Invalid Credentials');
                }

                const token = await generateToken(loginInput.email, user.id, context);

                return { user, token, tokenExpiration: 1 };

            } catch (error) {
                throw new ApolloError('Error while doing login: ' + error.message, 'INTERNAL_SERVER_ERROR');
            }
        },

        sendPasswordEmail: async (parent, { email }, context): Promise<boolean> => {
            try {

                await sendPasswordEmail(email, context);
                return true;
            } catch (error) {
                throw new ApolloError('Error sending email: ' + error.message, 'INTERNAL_SERVER_ERROR');
            }
        },

        confirmPasswordResetCode: async (parent, { email, code }, context): Promise<User> => {
            try {

                const passwordReset = await context.prisma.passwordReset.findFirst({
                    where: {
                        code,
                        user: {
                            email
                        }
                    },
                    include: {
                        user: true,
                    }
                });

                if (!passwordReset) {
                    throw new UserInputError('Invalid Code');
                }

                return passwordReset.user;
            } catch (error) {
                throw new ApolloError('Error sending email: ' + error.message, 'INTERNAL_SERVER_ERROR');
            }
        }
    },



    Mutation: {
        createUser: async (parent, { userInput }, context): Promise<User> => {
            try {

                if (!userInput) {
                    throw new UserInputError('Please provide inputs');
                }

                await validate(userInput, context);

                const password = await hashPassword(userInput.password!);


                const profileId: number = userInput.profile?.id ? userInput.profile.id : 1

                const user = await context.prisma.user.create({
                    data: {
                        name: userInput.name!,
                        email: userInput.email!,
                        password,
                        profile: {
                            connect: {
                                id: profileId
                            }
                        }
                    },
                    include: {
                        profile: true
                    }
                });

                user.token = await generateToken(userInput.email!, user.id, context);
                return user;

            } catch (error) {
                throw new ApolloError(`Error while creating user: ${error.message}`, error.code ? error.code :
                    'INTERNAL_SERVER_ERROR');
            }
        },

        resetPassword: async (parent, { newPassword, userInput }, context): Promise<boolean> => {
            try {

                if (!newPassword || !userInput) {
                    throw new UserInputError('Please provide inputs');
                }

                const password = await hashPassword(newPassword);

                const { id, name, email } = userInput;

                if (!id || !name || !email) {
                    throw new UserInputError('Please provide inputs');
                }

                const user = await context.prisma.user.update({
                    data: {
                        password
                    },
                    where: {
                        passwordResetKey: { id, name, email }
                    },
                });

                if (!user) {
                    throw new UserInputError('Invalid Inputs');
                }

                return true;
            } catch (error) {
                throw new ApolloError(`Error while resetting password: ${error.message}`, error.code ? error.code :
                    'INTERNAL_SERVER_ERROR');
            }
        },
    },
}

export default userResolver;