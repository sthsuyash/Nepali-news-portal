import prisma from "../../config/prisma.js";

const seedSentiments = async () => {
    try {
        await prisma.sentiment.createMany({
            data: [{ name: "POSITIVE" }, { name: "NEGATIVE" }, { name: "NEUTRAL" }],
            skipDuplicates: true, // Ensures roles are not duplicated
        });

        console.log("Sentiments seeded successfully.");
    } catch (error) {
        console.error("Error seeding roles:", error);
    } finally {
        await prisma.$disconnect();
    }
};

export default seedSentiments;
