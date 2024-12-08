import bcryptjs from "bcryptjs";
import { config } from "../../config/index.js";
import prisma from "../../config/prisma.js";

const seedAdmin = async () => {
    const ADMIN_EMAIL = config.admin.email;
    const ADMIN_PASSWORD = config.admin.password;
    const ADMIN_NAME = config.admin.name;

    try {
        // Check if the admin already exists
        const existingAdmin = await prisma.user.findFirst({
            where: { role: { name: "ADMIN" } },
        });

        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }

        // Fetch the ADMIN role
        const adminRole = await prisma.role.findUnique({
            where: { name: "ADMIN" },
        });

        if (!adminRole) {
            console.error("Admin role not found. Please ensure roles are seeded.");
            return;
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(ADMIN_PASSWORD, 10);

        // Create the admin user
        await prisma.user.create({
            data: {
                email: ADMIN_EMAIL,
                password: hashedPassword,
                name: ADMIN_NAME,
                isVerified: true,
                roleId: adminRole.id,
            },
        });

        console.log(`Admin user created successfully: ${ADMIN_EMAIL}`);
    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await prisma.$disconnect();
    }
};

export default seedAdmin;
