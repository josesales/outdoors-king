import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/graphql/user/userUtil';
import { users, categories, profiles } from './data';

const prisma = new PrismaClient();

async function seed() {

    let adminProfile = {
        id: 'id',
        name: 'admin'
    };

    let clientProfile = {
        id: 'id',
        name: 'client'
    };


    for (let category of categories) {
        await prisma.category.create({
            data: category
        });
    }

    for (let profile of profiles) {

        const profileDb = await prisma.profile.create({
            data: profile
        });

        if (profileDb.name === 'admin') {
            adminProfile.id = profileDb.id;
        } else {
            clientProfile.id = profileDb.id;
        }
    }

    for (let user of users) {

        if (user.profile.name === adminProfile.name) {
            user.profile.id = adminProfile.id;
        } else {
            user.profile.id = clientProfile.id;
        }

        const password = await hashPassword(user.password);

        await prisma.user.create({
            data: {
                ...user,
                password,
                profile: {
                    connect: {
                        id: user.profile.id
                    }
                }
            },
        });
    }
};

seed().then(() => {
    console.log('Your database has been seeded!');
}).catch(e => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
});
