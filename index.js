const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: { origin: "*" },
});
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

let usersConnected = 0;
let total = 0;
let scores = new Map;

function getUser(username) {
    if (!scores.get(username)) scores.set(username, {score: 0, connected: true})
    return scores.get(username)
}

// escuchar conexiones
io.on("connection", (socket) => {
    usersConnected++;
    // escuchar mensaje
    socket.on("message", (message) => {
        io.emit("message", {
            username: socket.username,
            message: message,
        });
    });

    // evento para saber quien es el username del socket abierto y emite el
    // username y usersConnected
    socket.on("iam", (username) => {
        const user = getUser(username)
        console.log(scores)
        socket.broadcast.emit("usuario conectado", {
            username,
            usersConnected,
        });
        socket.username = username;
        io.emit("numero de usuarios", {
            usersConnected,
            total,
        });
    });

    socket.on("click", () => {
        const user = getUser(socket.username)
        user.score++
        total++;
        user.score++
        io.emit("new click", {
            total,
            scores
        });
    });

    // detecta la desconexión y emite un evento al cliente con el username desconectado
    socket.on("disconnect", () => {
        console.log("disconnected: ", socket.username)
        usersConnected--;
        socket.broadcast.emit("usuario desconectado", {
            username: socket.username,
            usersConnected: usersConnected,
        });
    });
});

const port = process.env.PORT || 3000;

http.listen(port);
