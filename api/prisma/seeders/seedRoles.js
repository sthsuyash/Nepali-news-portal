import prisma from "../../config/prisma.js";

const seedRoles = async () => {
    try {
        await prisma.role.createMany({
            data: [{ name: "USER" }, { name: "ADMIN" }],
            skipDuplicates: true, // Ensures roles are not duplicated
        });

        console.log("Roles seeded successfully.");
    } catch (error) {
        console.error("Error seeding roles:", error);
    } finally {
        await prisma.$disconnect();
    }
};

export default seedRoles;