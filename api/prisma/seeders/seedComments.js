import prisma from "../../config/prisma.js";  // Adjust path based on your project structure

// Function to generate random Nepali comments
const generateNepaliComment = () => {
    const comments = [
        "यो समाचार निकै रोचक छ।",
        "नेपालमा भएका घटनाक्रमलाई मैले मन पराइरहेको छु।",
        "तपाईंको लेखले मलाई धेरै केही सिक्न मद्दत गर्‍यो।",
        "यस विषयमा अझ धेरै जानकारीको आवश्यकता छ।",
        "नेपालको विकासको बारेमा यस लेखले धेरै राम्रो प्रकाश पारेको छ।",
        "यस लेखमा केही तथ्यहरू गलत छन्, कृपया सुधार गर्नुहोस्।",
        "मैले यो समाचार पढ्दा निकै प्रभावित भएँ।",
        "यस्तो लेख भविष्यमा पनि लेख्नुस्।",
        "यस विषयमा लेख्नुभएकोमा धन्यवाद।",
        "नेपालका बारेमा यस्तो जानकारी पुर्याउनु भएकोमा आभार।"
    ];

    return comments[Math.floor(Math.random() * comments.length)];
};

const seedComments = async () => {
    try {
        // Fetch all posts from the database
        const posts = await prisma.post.findMany();

        // Fetch all users from the database
        const users = await prisma.user.findMany();

        if (posts.length === 0 || users.length === 0) {
            console.log("No posts or users found to associate comments with.");
            return;
        }

        // Loop through each post and create random comments
        for (const post of posts) {
            const numberOfComments = Math.floor(Math.random() * 5) + 1; // Random number of comments (1-5)

            for (let i = 0; i < numberOfComments; i++) {
                const randomUser = users[Math.floor(Math.random() * users.length)];
                const commentContent = generateNepaliComment();  // Generate a random Nepali comment

                // Create a comment and associate it with the post and user
                await prisma.comment.create({
                    data: {
                        content: commentContent,
                        postId: post.id,
                        userId: randomUser.id,
                    },
                });

                console.log(`Comment added to post: ${post.title} by user: ${randomUser.name}`);
            }
        }

        console.log("Comments seeded successfully.");
    } catch (error) {
        console.error("Error seeding comments:", error);
    } finally {
        await prisma.$disconnect();  // Close the Prisma client connection
    }
};

export default seedComments;
