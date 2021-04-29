let text = document.querySelector("#chat");
let sendButton = document.querySelector("#sendButton");
let textMessage = document.querySelector("#textMessage");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("user")

const socket = io();

socket.on("message", (data) => {
    const d = document.createElement("div");
    const t = document.createTextNode(data.username + ": " + data.message);
    d.appendChild(t);
    text.appendChild(d);
});

socket.on("usuario conectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha conectado"
    );
    d.appendChild(t);
    text.appendChild(d);

    usersConnected.innerText = data.usersConnected;
});

socket.on("usuario desconectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha desconectado!"
    );
    d.appendChild(t);
    text.appendChild(d);

    usersConnected.innerText = data.usersConnected;
});

socket.on("connect", () => {
    socket.emit("iam", username);
});

socket.on("numero de usuarios", (data) => {
    usersConnected.innerText = data.usersConnected;
    numClicksText.innerHTML = data.total;
});
socket.on("new click", (data) => {
    numClicksText.innerText = data.total;
    updateList(data.scores)
});

sendButton.onclick = () => {
    socket.emit("click");
};
