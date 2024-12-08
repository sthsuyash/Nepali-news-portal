import prisma from "../../config/prisma.js";
import { faker } from '@faker-js/faker';

// Function to generate random Nepali titles
const generateNepaliTitle = () => {
    const titles = [
        "नेपालको नयाँ विकास योजनाहरू",
        "नेपालमा आगामी चुनावको तयारी",
        "नेपालका प्रमुख पर्यटकीय गन्तव्यहरू",
        "नेपालमा शिक्षा प्रणाली सुधार",
        "नेपालको अर्थव्यवस्था र भविष्य",
        "काठमाडौँको ऐतिहासिक महत्व",
        "नेपालको सांस्कृतिक धरोहर",
        "नेपालमा महिलाको सशक्तिकरण",
        "नेपालको स्वास्थ्य सेवा सुधार",
        "नेपालका प्रमुख खेलकुद गतिविधिहरू"
    ];

    return titles[Math.floor(Math.random() * titles.length)];
};

// Function to generate random HTML content for the description in Nepali
const generateHTMLDescription = () => {
    const paragraphs = [
        "नेपाल एक सुन्दर देश हो जसको सांस्कृतिक र ऐतिहासिक महत्व छ। यहाँको प्राकृतिक सौंदर्यले पर्यटकलाई आकर्षित गर्दछ।",
        "नेपालमा विभिन्न जातजातिका मानिस बसोबास गर्छन्, र यहाँको विविधता पनि अत्यधिक आकर्षक छ।",
        "नेपालका प्रमुख पर्यटकीय गन्तव्यहरूमा काठमाडौँ, पोखरा, चितवन र लुम्बिनी समावेश छन्।",
        "नेपालको परम्परा र संस्कृतिमा विशिष्टता पाइन्छ। यहाँको चाडपर्व, लोककला र भेषभूषाले नेपाली समाजको विविधता प्रस्तुत गर्छ।",
        "नेपालका गाउँहरूमा बसोबास गर्ने मानिसहरूको जीवनशैली निकै सरल र सादगीपूर्ण छ।"
    ];

    const description = paragraphs[Math.floor(Math.random() * paragraphs.length)];

    const htmlContent = `
        <div>
            <h2>${faker.lorem.sentence()}</h2>
            <p>${description}</p>
            <p><strong>थप जानकारी:</strong> ${faker.lorem.sentence()}</p>
            <p><a href="#">अझ पढ्नुहोस्</a></p>
        </div>
    `;
    return htmlContent;
};

const getRandomImage = async () => {
    try {
        const response = await fetch('https://picsum.photos/1920/1080');
        const imageUrl = response.url;
        return imageUrl;
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};

const seedPosts = async () => {
    try {
        const categories = [
            "economy", "opinion", "national", "sports", "entertainment",
            "diaspora", "literature", "technology", "health", "world"
        ];

        const sentiments = [
            "POSITIVE", "NEGATIVE", "NEUTRAL"
        ];

        const admin = await prisma.user.findFirst({
            where: { role: { name: "ADMIN" } },
        });

        if (!admin) {
            console.error("Admin user not found. Please ensure the admin user is seeded.");
            return;
        }

        // Loop through each category and create posts for it
        for (const categoryName of categories) {
            const category = await prisma.category.findUnique({
                where: { name: categoryName },
            });

            if (!category) {
                console.error(`Category not found: ${categoryName}`);
                continue;
            }

            // Create 10 posts for each category
            for (let i = 0; i < 10; i++) {
                const title = generateNepaliTitle();
                // create slug by exact date and time
                const slug = `${faker.lorem.slug()}-${Date.now()}`;
                const description = generateHTMLDescription();
                const image = await getRandomImage();
                const status = i % 2 === 0 ? "PUBLISHED" : "DRAFT";

                // generate a random sentiment
                const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

                // get the sentiment id
                const sentimentId = await prisma.sentiment.findFirst({
                    where: { name: sentiment }
                });

                console.log(`Sentiment: ${sentiment} - Sentiment ID: ${sentimentId.id}`);

                // Create a post linked to the category
                await prisma.post.create({
                    data: {
                        title,
                        slug,
                        description,
                        image,
                        status,
                        category: {
                            connect: { id: category.id }
                        },
                        user: {
                            connect: { id: admin.id }
                        },
                        sentiment: {
                            connect: { id: sentimentId.id }
                        }

                    },
                });

                console.log(`Post created for category: ${categoryName} - Title: ${title}`);
            }
        }

        console.log("Posts seeded successfully.");
    } catch (error) {
        console.error("Error seeding posts:", error);
    } finally {
        await prisma.$disconnect();
    }
};

export default seedPosts;
// seedPosts();