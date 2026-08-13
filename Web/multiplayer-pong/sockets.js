let readyPlayerCount = 0;
function listenForSocketEvents(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("ready", () => {
      console.log("Player is ready:", socket.id);
      readyPlayerCount++;
      if (readyPlayerCount % 2 === 0) {
        //  broadcast to function to start game
        io.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      // Broadcast the paddle position to the other player
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      // Broadcast the ball position to the other player
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
    });
  });
}

module.exports = {
  listenForSocketEvents,
};
