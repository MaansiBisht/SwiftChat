# SwiftChat

A modern, secure chat application built with **React**, **Node.js**, **Express**, **MongoDB**, and **WebSockets**. This project demonstrates real-time communication, robust authentication, and end-to-end encryption (E2EE) for private messaging.

---

## 🚀 Features

- **Real-Time Messaging:** Instant chat using WebSocket technology.
- **End-to-End Encryption:** Messages are encrypted on the client and decrypted only by the recipient.
- **User Authentication:** Secure login and protected routes.
- **Online/Offline User Status:** See who’s available to chat.
- **Modern UI:** Responsive design with React and Tailwind CSS.

---

## 🛠️ Technologies Used

- **Frontend:** React, Axios, React Context, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Real-Time:** WebSocket API
- **Encryption:** Asymmetric cryptography (public/private keys)
- **State Management:** React Context API

---

## 🧠 Key Learnings

- **End-to-End Encryption:** True E2EE requires careful handling of outbound and inbound messages, including storing self-copies for sent messages.
- **WebSocket Reliability:** Persistent connections need reconnection logic and keep-alive heartbeats to survive network hiccups and server restarts.
- **Optimistic UI:** For a smooth experience, update the chat window immediately when sending messages, even before server confirmation.
- **Schema Design:** Mongo schema design for encrypted data storage.
- **Error Handling:** Robust error handling is critical for both network and cryptographic operations.
- **React Patterns:** Custom hooks and context APIs make state management and side effects (like WebSocket connections) manageable and scalable.

---

## 📚 References

- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [OWASP: Secure Messaging](https://owasp.org/www-project-secure-headers/)
- [Signal Protocol](https://signal.org/docs/)

---

## 💡 Future Improvements

- Group chats with multi-party encryption
- Message delivery/read receipts
- File/image and stickers sharing with encryption
- Push notifications

