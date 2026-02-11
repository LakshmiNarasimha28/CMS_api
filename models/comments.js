import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
        type: String,
        required: true
    },
    artifact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artifact",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    },
    { timestamps: true }
);

commentSchema.index({ artifact: 1, user: 1 });

export default mongoose.model("Comment", commentSchema);