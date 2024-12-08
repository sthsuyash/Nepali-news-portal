import prisma from "../../config/prisma.js";  // Adjust this import path as needed

const seedCategories = async () => {
    try {
        // Seeding categories with Nepali names
        await prisma.category.createMany({
            data: [
                { name: "economy", nepaliName: "अर्थबाणिज्य" },
                { name: "opinion", nepaliName: "विचार" },
                { name: "national", nepaliName: "देश" },
                { name: "sports" , nepaliName: "खेलकुद" },
                { name: "entertainment" , nepaliName: "मनोरञ्जन" },
                { name: "diaspora" , nepaliName: "प्रवास" },
                { name: "literature", nepaliName: "साहित्य" },
                { name: "technology", nepaliName: "सूचनाप्रविधि" },
                { name: "health" , nepaliName: "स्वास्थ्य" },
                { name: "world" , nepaliName: "विश्व" },
            ],
            skipDuplicates: true,  // Avoids duplicate entries if already present
        });

        console.log("Categories seeded successfully.");
    } catch (error) {
        console.error("Error seeding categories:", error);
    } finally {
        await prisma.$disconnect();  // Close the Prisma client connection
    }
};

export default seedCategories;
