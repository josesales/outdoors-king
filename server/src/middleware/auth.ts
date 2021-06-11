import { PrismaClient } from '@prisma/client';
import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const auth = async (token: string, prisma: PrismaClient) => {

    let user = null;
    try {

        if (!token) {
            return null;
        }

        token.replace('Bearer ', '');
        const decoded: any = jwt.verify(token, process.env.JWT_KEY!);

        user = await prisma.user.findFirst({
            where: {
                id: decoded.userId,
                token
            },
            include: {
                profile: true
            }
        });

    } catch (error) {
        user = null;
        throw new ApolloError(`Error while creating user: ${error.message}`, 'INTERNAL_SERVER_ERROR');
    } finally {
        return user;
    }
}
