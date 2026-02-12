import { getChatbyThreadService, sendChatService, 
    // markMessagesAsReadService
 } from "../services/chatservices.js";

export const getChatByThread = async (req, res) => {
    const { threadId } = req.params;
    try {
        const chats = await getChatbyThreadService(threadId);
        res.status(200).json({ success: true, chats });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const sendChat = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId, message, attachments } = req.body;
        const chat = await sendChatService(senderId, receiverId, message, attachments);
        res.status(201).json({ success: true, chat });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// export const markMessagesAsRead = async (req, res) => {
//     try {
//         const { threadId } = req.params;
//         const userId = req.user.id;
//         const result = await markMessagesAsReadService(threadId, userId);
//         res.status(200).json({ 
//             success: true, 
//             message: `Marked ${result.modifiedCount} messages as read` 
//         });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };