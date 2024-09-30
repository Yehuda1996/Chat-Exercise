import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4001",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("User is connected");
    
    socket.on("submit", (data) => {
        console.log("Messaged received", data);
        socket.broadcast.emit('submit', data);
    })
});

io.on("disconnect", () => {
    console.log("User is disconnected");
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})