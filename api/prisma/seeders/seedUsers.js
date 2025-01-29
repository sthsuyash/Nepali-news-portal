import bcryptjs from "bcryptjs";
import prisma from "../../config/prisma.js";

const seedUsers = async () => {
    const users = [
        { email: "user1@example.com", password: "password123", name: "User One", role: "USER" },
        { email: "user2@example.com", password: "password123", name: "User Two", role: "USER" },
    ];

    try {
        for (const user of users) {
            const hashedPassword = await bcryptjs.hash(user.password, 10);
            const role = await prisma.role.findUnique({
                where: { name: user.role },
            });

            if (!role) {
                console.error(`Role not found: ${user.role}`);
                continue;
            }

            await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    email: user.email,
                    password: hashedPassword,
                    name: user.name,
                    roleId: role.id,
                    isVerified: true,
                },
            });
            console.log(`User created: ${user.email}`);
        }
    } catch (error) {
        console.error("Error seeding users:", error);
    } finally {
        await prisma.$disconnect();
    }
};

export default seedUsers;
