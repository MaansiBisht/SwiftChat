const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Message = require("./models/messageModel");
const { clear } = require("console");
const { User } = require("./models/userModel");

const createWebSocketServer = (server) => {
    const wss = new ws.Server({ server });

    wss.on("connection", (connection, req) => {
        const notifyAboutOnlinePeople = async () => {
            try {
                const onlineUsers = await Promise.all(
                    [...wss.clients]
                        .filter(client => client.userId) // Only authenticated clients
                        .map(async (client) => {
                            const user = await User.findById(client.userId);
                            return {
                                userId: client.userId,
                                username: client.username,
                                avatarLink: user?.avatarLink || null,
                            };
                        })
                );
                [...wss.clients].forEach(client => {
                    if (client.readyState === ws.OPEN && client.userId) {
                        client.send(JSON.stringify({ online: onlineUsers }));
                    }
                });
                console.log("Online users:", onlineUsers);
            } catch (err) {
                console.error("Error notifying online users:", err);
            }
        };

        // Extract auth token from cookies
        const cookies = req.headers.cookie;
        if (cookies) {
            const tokenString = cookies.split(";").find(str => str.startsWith("authToken="));
            if (tokenString) {
                console.log("Token found:", tokenString);
                const token = tokenString.split("=")[1];
                jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
                    console.log("Verifying token:", userData);
                    if (err) {
                        console.error("JWT verification error:", err);
                        connection.close(); // Disconnect unauthenticated clients
                        return;
                    }

                    // Set user data on the connection
                    connection.userId = userData._id;
                    connection.username = `${userData.firstName} ${userData.lastName}`;

                    // Notify about online users after authentication
                    await notifyAboutOnlinePeople();

                    // Set up message handler AFTER authentication
                    connection.on("message", async (message) => {
                        try {
                            const messageData = JSON.parse(message.toString());
                            const { recipient, text } = messageData;

                            // Validate input
                            if (!recipient || !text) {
                                console.warn("Invalid message format");
                                return;
                            }

                            // Save to database
                            const msgDoc = await Message.create({
                                sender: connection.userId,
                                recipient,
                                text,
                            });

                            // Forward message to recipient
                            [...wss.clients].forEach(client => {
                                if (client.userId === recipient && client.readyState === ws.OPEN) {
                                    client.send(JSON.stringify({
                                        sender: connection.userId,
                                        recipient,
                                        text,
                                        _id: msgDoc._id,
                                        createdAt: msgDoc.createdAt,
                                    }));
                                }
                            });
                        } catch (err) {
                            console.error("Error handling message:", err);
                        }
                    });
                });
            } else {
                connection.close(); // No token found
            }
        } else {
            connection.close(); // No cookies found
        }

        // WebSocket server
        connection.isAlive = true;
        connection.on('pong', () => (connection.isAlive = true));

        // Ping clients every 30 seconds
        const interval = setInterval(() => {
            wss.clients.forEach(client => {
                if (!client.isAlive) return client.terminate();
                client.isAlive = false;
                client.ping();
            });
        }, 30000);
        
        // Handle client disconnection
        connection.on("close", () => {
            notifyAboutOnlinePeople().catch(console.error);
        });
    });

    return wss;
};

module.exports = createWebSocketServer;