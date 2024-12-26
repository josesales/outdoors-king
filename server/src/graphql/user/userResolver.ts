import { ApolloError, UserInputError } from "apollo-server-errors";
import {
  validate,
  hashPassword,
  generateToken,
  sendPasswordEmail,
} from "./userUtil";
import { Resolvers, User, Auth } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import bcrypt from "bcryptjs";
import {
  validateAdminUser,
  validateAuthenticatedUser,
} from "../../permissions/permission";

const userResolver: Resolvers<Context> = {
  Query: {
    user: async (_parent, _args, context): Promise<User> => {
      try {
        validateAuthenticatedUser(context);
        return context.user;
      } catch (error) {
        if (error instanceof Error) {
          throw new ApolloError(
            "Error while fetching user: " + error.message,
            "INTERNAL_SERVER_ERROR"
          );
        }
        throw new ApolloError(
          "Unknown error occurred while fetching user",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    login: async (_parent, { loginInput }, context): Promise<User> => {
      try {
        if (!loginInput) {
          throw new UserInputError("Please provide inputs");
        }

        const user = await context.prisma.user.findUnique({
          where: {
            email: loginInput?.email,
          },
          include: {
            profile: true,
          },
        });

        if (!user) {
          throw new UserInputError("Invalid Credentials");
        }

        const isPasswordRight = await bcrypt.compare(
          loginInput.password,
          user.password
        );

        if (!isPasswordRight) {
          throw new UserInputError("Invalid Credentials");
        }

        user.token = await generateToken(loginInput.email, user.id, context);

        return user;
      } catch (error) {
        if (error instanceof Error) {
          throw new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
        }
        throw new ApolloError(
          "Unknown error occurred while doing login",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    logout: async (_, { id }, context): Promise<boolean> => {
      try {
        if (!id) {
          throw new UserInputError("Please provide inputs");
        }

        const user = await context.prisma.user.update({
          data: {
            token: null,
          },
          where: {
            id,
          },
        });

        if (!user) {
          throw new UserInputError("Invalid Inputs");
        }

        return true;
      } catch (error) {
        if (error instanceof ApolloError) {
          new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
        }
        throw new ApolloError(
          "Unknown error occurred while doing logout",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    sendPasswordEmail: async (_, { email }, context): Promise<boolean> => {
      try {
        if (!email) {
          throw new UserInputError("Please provide email");
        }

        const userDB = await context.prisma.user.findUnique({
          where: { email },
        });

        if (!userDB) {
          throw new UserInputError("Email is not in the system");
        }

        await sendPasswordEmail(email, context);
        return true;
      } catch (error) {
        if (error instanceof ApolloError) {
          new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
        }
        throw new ApolloError(
          "Unknown error occurred while sending password confirmation email",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    confirmPasswordResetCode: async (
      _,
      { email, code },
      context
    ): Promise<User> => {
      try {
        const passwordReset = await context.prisma.passwordReset.findFirst({
          where: {
            code,
            user: {
              email,
            },
          },
          include: {
            user: true,
          },
        });

        if (!passwordReset) {
          throw new UserInputError("Invalid Code");
        }

        return passwordReset.user;
      } catch (error) {
        if (error instanceof Error) {
          new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
        }
        throw new ApolloError(
          "Unknown error occurred while sending confirming password reset code",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },

  Mutation: {
    saveUser: async (_, { userInput }, context): Promise<User> => {
      try {
        if (!userInput) {
          throw new UserInputError("Please provide inputs");
        }

        if (userInput.id) {
          validateAuthenticatedUser(context);
        }

        await validate(userInput, context);

        const password = await hashPassword(userInput.password!);

        let profileId: string = "";
        let profileName: string = "client";

        if (userInput.profile?.name?.toLowerCase() === "admin") {
          await validateAdminUser(context);
          profileName = "admin";
        }

        const profile = await context.prisma.profile.findUnique({
          where: {
            name: profileName,
          },
        });

        profileId = profile?.id!;

        const upsertData = {
          name: userInput.name!,
          email: userInput.email!,
          password,
          profile: {
            connect: {
              id: profileId,
            },
          },
        };

        const user = await context.prisma.user.upsert({
          create: upsertData,
          update: upsertData,
          where: {
            id: userInput.id ? userInput.id : "",
          },
          include: {
            profile: true,
          },
        });

        user.token = await generateToken(userInput.email!, user.id, context);
        return user;
      } catch (error) {
        if (error instanceof ApolloError) {
          new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
        }
        throw new ApolloError(
          "Unknown error occurred while saving user",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    resetPassword: async (
      _,
      { newPassword, userInput },
      context
    ): Promise<boolean> => {
      try {
        if (!newPassword || !userInput) {
          throw new UserInputError("Please provide inputs");
        }

        const password = await hashPassword(newPassword);

        const { id, name, email } = userInput;

        if (!id || !name || !email) {
          throw new UserInputError("Please provide inputs");
        }

        const user = await context.prisma.user.update({
          data: {
            password,
          },
          where: {
            passwordResetKey: { id, name, email },
          },
        });

        if (!user) {
          throw new UserInputError("Invalid Inputs");
        }

        return true;
      } catch (error) {
        if (error instanceof ApolloError) {
          new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
        }
        throw new ApolloError(
          "Unknown error occurred while resetting password",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },
};

export default userResolver;
