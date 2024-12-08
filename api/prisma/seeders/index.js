import seedRoles from "./seedRoles.js";
import seedCategories from "./seedCategories.js";
import seedAdmin from "./seedAdmin.js";
import seedUsers from "./seedUsers.js";
import seedPosts from "./seedPosts.js";
import seedComments from "./seedComments.js";
import seedSentiments from "./seedSentiments.js";

const runSeeders = async () => {
    console.log("Starting seeders...");

    try {
        await seedRoles();
        await seedCategories();
        await seedSentiments();
        await seedAdmin();
        await seedUsers();
        await seedPosts();
        await seedComments();

        console.log("All seeders executed successfully.");
    } catch (error) {
        console.error("Error running seeders:", error);
    }
};

runSeeders();
