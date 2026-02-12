import Chat from '../models/chat.js';
import Thread from '../models/thread.js';

export const getChatbyThreadService = async (threadId) => {
    return await Chat.find({ thread: threadId }).populate("sender", "name email").sort({ createdAt: 1 });
};

export const sendChatService = async (senderId, receiverId, message, attachments) => {
    if (!receiverId) {
        throw new Error("Receiver ID is required");
    }
    if (senderId.toString() === receiverId.toString()) {
        throw new Error("Cannot send message to yourself");
    }
    const thread = await findOrCreateThreadService(senderId, receiverId);
    const chat = new Chat({ //chat creation
        thread: thread._id,
        sender: senderId,
        message: message,
        attachments: attachments,
    });
    await chat.save();
    return chat;

};


// marking chat as read by user

// export const markMessagesAsReadService = async (threadId, userId) => {
//     const result = await Chat.updateMany(
//         { thread: threadId, sender: { $ne: userId }, readBy: { $ne: userId } },
//         { $addToSet: { readBy: userId } }
//     );
//     return result;
// };
//      or
// export const markChatAsReadService = async (chatId, userId) => {
//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//         throw new Error("Chat not found");
//     }
//     if (!chat.readBy.includes(userId)) {
//         chat.readBy.push(userId);
//         chat.isRead = true;
//         await chat.save();
//     }
//     return chat;
// };


export const findOrCreateThreadService = async (userId1, userId2) => {
    const participants = [userId1, userId2].sort();
    // let thread = await Thread.findOne({ participants: { $all: participants, $size: 2 } });
    let thread = await Thread.findOne({ 
        participants: { $all: participants }, 
        $expr: { $eq: [{ $size: "$participants" }, 2] }
    });
    // if (!thread) {
    //     thread = new Thread({ participants, createdBy: userId1 });
    //     await thread.save();
    // }
    if (!thread) {
        thread = await Thread.create({participants, createdBy: userId1});
    }
    return thread;
};
