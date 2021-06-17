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
        //It may end up in the catch if the token is expired so user has to login again
        user = null;
    } finally {
        return user;
    }
}
