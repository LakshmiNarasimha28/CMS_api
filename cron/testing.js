import cron from "node-cron";
import Artifact from "../models/artifact.js";
// // Schedule a task to run every minute
// cron.schedule("* * * * *", () => {
//     console.log("Running a task every minute");
// });

// // Schedule a task to run every day at midnight
// cron.schedule("0 0 * * *", () => {
//     console.log("Running a task every day at midnight");
// });

export const testingCron = () => {
    console.log("Testing scheduled task");
    cron.schedule("22 15 * * *", () => {
        console.log("Running a task every minute");
    });
}

export const updateArtifactStatusCron = () => {
    cron.schedule("0 */12 * * *", async () => {
        console.log("Running artifact archival check for inactive drafts...");
        try {
            const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
            
            const result = await Artifact.updateMany(
                {
                    status: "DRAFT",
                    updatedAt: { $lt: twelveHoursAgo }
                },
                {
                    $set: { status: "ARCHIVED" }
                }
            );
            
            console.log(`Archived ${result.modifiedCount} inactive draft artifacts`);
        } catch (error) {
            console.error("Error archiving inactive artifacts:", error);
        }
    });
}