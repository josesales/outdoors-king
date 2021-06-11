import { AuthenticationError } from "apollo-server-express";
import { User } from "../graphql/generated/graphql-server";
import Context from "../interfaces/context";

export const validateAdminUser = async (context: Context) => {

    const { user, prisma } = context;

    const adminProfile = await prisma.profile.findFirst({
        where: {
            name: 'admin'
        }
    })

    if (!user || !user.profile || !user.profile.id || user.profile.id !== adminProfile?.id) {
        throw new AuthenticationError('You need to be an admin user for this operation');
    }
}

export const validateAuthenticatedUser = (context: Context) => {

    const { user } = context;
    if (!user) {
        throw new AuthenticationError('You need to be authenticated');
    }
}