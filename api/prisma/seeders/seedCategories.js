import prisma from "../../config/prisma.js";  // Adjust this import path as needed

const seedCategories = async () => {
    try {
        // Seeding categories with Nepali names
        await prisma.category.createMany({
            data: [
                { name: "economy", nepaliName: "अर्थबाणिज्य" , label: 0},
                { name: "opinion", nepaliName: "विचार" , label: 1},
                { name: "national", nepaliName: "देश" , label: 2},
                { name: "sports" , nepaliName: "खेलकुद" , label: 3},
                { name: "entertainment" , nepaliName: "मनोरञ्जन" , label: 4},
                { name: "diaspora" , nepaliName: "प्रवास" , label: 5},
                { name: "literature", nepaliName: "साहित्य" , label: 6},
                { name: "technology", nepaliName: "सूचनाप्रविधि" , label: 7},
                { name: "health" , nepaliName: "स्वास्थ्य" , label: 8},
                { name: "world" , nepaliName: "विश्व" , label: 9},
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
