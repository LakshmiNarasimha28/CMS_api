import { toogleLikeService } from "../services/likesservices.js";

export const toogleLike = async (req, res) => {
    try {
        // const { artifactId } = req.body;
        // if (!artifactId) {
        //     return res.status(400).json({ success: false, message: "Artifact ID is required" });
        // }
        const result = await toogleLikeService({ userId: req.user.id, artifactId:req.params.artifactId });
        res.status(200).json({
            success: true,
            message: result.liked ? "Artifact liked" : "Like removed",
            ...result,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};