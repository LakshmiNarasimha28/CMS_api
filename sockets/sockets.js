import { sendChatService } from "../services/chatservices.js";

// export const registerSocketHandlers = (io) => {

//     const onlineUsers = new Map();
//     io.on("connection", (socket) => {
//         console.log("User connected: ", socket.id);

//         socket.on("user-online", (userId) => {
//             onlineUsers.set(userId, socket.id);
//             // console.log(`User ${userId} registered with socket ID ${socket.id}`);
//             // console.log("Online users: ", Array.from(onlineUsers.keys()));
//             console.log("Online users:", onlineUsers);
//         });

//         socket.on("sendMessage", async ({ senderId, receiverId, message, attachments }) => {
//             try {
//                 const chat = await sendChatService(senderId, receiverId, message, attachments);
//                 const receiverSocketId = onlineUsers.get(receiverId);
//                 if (receiverSocketId) {
//                     io.to(receiverSocketId).emit("newMessage", chat);
//                 }
//             } catch (error) {
//                 console.error("Error sending message: ", error);
//             }
//         });

//         socket.on("disconnect", () => {
//             for (const [userId, socketId] of onlineUsers.entries()) {
//                 if (socketId === socket.id) {
//                     onlineUsers.delete(userId);
//                     console.log(`User ${userId} disconnected`);
//                     break;
//                 }
//             }
//             console.log("Online users: ", Array.from(onlineUsers.keys()));
//         });
//     });
// };


export const registerSocketHandlers = (io) => {
    const onlineUsers = new Map();

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("user-online", (userId) => {
            if (!userId) return;
            onlineUsers.set(userId, socket.id);
            console.log("Online Users:", [...onlineUsers.keys()]);
        });

        socket.on("send-message", async (data) => {
            try {
                const { senderId, receiverId, message, attachments } = data;
                if (!senderId || !receiverId || !message) return;
                const chat = await sendChatService(senderId, receiverId, message, attachments);

                const receiverSocketId = onlineUsers.get(receiverId);

                // Send to receiver
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("received-message", chat);
                }

                // Confirm to sender
                socket.emit("sent-message", chat);

            } catch (error) {
                console.error("Socket error:", error.message);
            }
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`User ${userId} disconnected`);
                    break;
                }
            }
            console.log("Online Users:", [...onlineUsers.keys()]);
        });
    });
};
