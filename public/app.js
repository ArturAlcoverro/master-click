let sendButton = document.querySelector("#sendButton");
let resetButton = document.querySelector("#reset");
let textMessage = document.querySelector("#textMessage");

let scoreElement = document.querySelector("#score");
let avgElement = document.querySelector("#avg");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");

let table = document.getElementById("scoresTable");

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("user") || "anonymous" + Math.floor(Math.random() * 1000);
let connected

scoreElement.innerText = "Your score:   " + (score ||0)

const socket = io();

socket.on("usuario conectado", (data) => {
    console.log(data)
    updateScoreList(data.scores)
    usersConnected.innerText = data.usersConnected;
});

socket.on("usuario desconectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha desconectado!"
    );
    d.appendChild(t);
    updateScoreList(data.scores)
    usersConnected.innerText = data.usersConnected;
});

socket.on("connect", () => {
    socket.emit("iam", username);
});

socket.on("numero de usuarios", (data) => {
    connected = data.usersConnected
    usersConnected.innerText = data.usersConnected;
    numClicksText.innerHTML = data.total;
    setAvg(data.total, connected)
    updateScoreList(data.scores)
});
socket.on("new click", (data) => {
    numClicksText.innerText = data.total;
    setAvg(data.total, connected)
    updateScoreList(data.scores)
});

socket.on("reset", (scores) => {
    setAvg(0, connected)
    updateScoreList(scores)
});

resetButton.onclick = () => {
    socket.emit("reset");
};

sendButton.onclick = () => {
    socket.emit("click");
};

sendButton.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

function setAvg(total, connected) {
    const avg = total / connected
    avgElement.innerText = "AVG: " + avg.toFixed(2)

    if (score > avg)
        scoreElement.classList = "green";
    else if (score == avg)
        scoreElement.classList = "yellow";
    else
        scoreElement.classList = "red";

}

function updateScoreList(scores) {
    let len = table.rows.length
    for (let i = 0; i < len; i++) {
        table.deleteRow(0)
    }

    scores.sort((a, b) => {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    })
    console.log(scores)
    scores.forEach((score, i) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${score.name}</td>
            <td>${score.score}</td>
        `

        if (score.name == username){
            tr.classList="me"
            scoreElement.innerText = "Your score: "+ score.score
        }
        
        if (score.connected) {
            tr.classList.add("connected")
        }


        const s = table.getElementsByTagName("tbody")
        s[0].appendChild(tr)
    });

}
