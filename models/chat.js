import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String },
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      required: false,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required:true
    },
    attachments: [attachmentSchema],
    type: {
      type: String,
      enum: ["text", "image", "file", "system"],
      default: "text",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

chatSchema.index({ thread: 1, createdAt: -1 });

export default mongoose.model("Chat", chatSchema);
