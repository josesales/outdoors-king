import { PrismaClient } from "@prisma/client";
import { User } from "../graphql/generated/graphql-server";

interface Context {
    prisma: PrismaClient,
    user: User
}

export default Context;