import likes from "../models/likes.js";

export const toogleLikeService = async ({ userId, artifactId }) => {
    const existingLike = await likes.findOne({ user: userId, artifact: artifactId });
    if (existingLike) {
        await likes.deleteOne({ _id: existingLike._id });
        return { liked: false };
    }
    await likes.create({ user: userId, artifact: artifactId });
    return { liked: true };
};