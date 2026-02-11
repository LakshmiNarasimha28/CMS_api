import Artifact from "../models/artifact.js";

export const createArtifactService = async ({ title, content, userId }) => {
    if(!title || !content) {
        throw new Error('Title and Content are required');
    }

    const artifact = await artifact.create({
        title,
        content,
        userId
    });
    return artifact; 
};
