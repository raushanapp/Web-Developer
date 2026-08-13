const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("ready", () => {
    console.log("Player is ready:", socket.id);
    readyPlayerCount++;
    if (readyPlayerCount === 2) {
      //  broadcast to function to start game
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    // Broadcast the paddle position to the other player
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    readyPlayerCount--;
  });
});
