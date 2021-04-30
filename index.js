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
let scores = [];

function getUser(username) {
    const result = scores.filter(e => e.name == username)
    if (result.length > 0) {
        result[0].connected = true
        return result[0]
    }
    let user = {
        name: username,
        score: 0,
        connected: true
    }
    scores.push(user)
}

// escuchar conexiones
io.on("connection", (socket) => {
    usersConnected++;

    // evento para saber quien es el username del socket abierto y emite el
    // username y usersConnected
    socket.on("iam", (username) => {
        getUser(username)
        socket.broadcast.emit("usuario conectado", {
            total,
            usersConnected,
            scores
        });
        socket.username = username;
        io.emit("numero de usuarios", {
            usersConnected,
            total,
            scores
        });
    });

    socket.on("click", () => {
        getUser(socket.username).score++
        total++;
        io.emit("new click", {
            total,
            scores
        });
    });

    socket.on("reset", () => {
        total = 0;
        scores = scores.filter(e=> e.connected)
        scores.forEach(e => {
            e.score = 0;
        })
        io.emit("reset", scores)
    });

    // detecta la desconexión y emite un evento al cliente con el username desconectado
    socket.on("disconnect", () => {
        console.log(socket.username, "disconnected")
        getUser(socket.username).connected = false
        usersConnected--;
        socket.broadcast.emit("usuario desconectado", {
            total,
            usersConnected: usersConnected,
            scores
        });
    });
});

const port = process.env.PORT || 3000;

http.listen(port);
