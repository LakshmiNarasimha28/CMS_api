import Artifact from "../models/artifact.js";
import cloudinary from "../config/cloudinary.js";

export const createArtifactService = async ({ title, content, userId }) => {
    // if(!title || !content) {
    //     throw new Error('Title and Content are required');
    // }

    // const artifact1 = await Artifact.create({
    //     title,
    //     content,
    //     user: userId
    // });
    // return artifact1; 

    let mediaUrl = null;
    if (filePath) {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: "artifacts",
            // use_filename: true,
            // unique_filename: false,
        });
        mediaUrl = uploadResult.secure_url;
        fs.unlinkSync(filePath); // Remove the file after uploading
    }
    console.log("Media URL:", mediaUrl);

    const artifact = await Artifact.create({
        title,
        content,
        user: userId,
        media: mediaUrl
    });
    return artifact; 

};


