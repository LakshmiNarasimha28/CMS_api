import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		isGroup: {
			type: Boolean,
			default: false,
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		lastMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},
		metadata: {
			type: mongoose.Schema.Types.Mixed,
		},
	},
	{ timestamps: true }
);

// threadSchema.index({ participants: 1 });
// threadSchema.index({ createdBy: 1 });

export default mongoose.model("Thread", threadSchema);
