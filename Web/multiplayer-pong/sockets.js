let readyPlayerCount = 0;

function listenForSocketEvents(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    let room;

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);

      console.log("Player  ready:", socket.id, room);
      readyPlayerCount++;
      if (readyPlayerCount % 2 === 0) {
        //  broadcast to function to start game
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      // Broadcast the paddle position to the other player
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      // Broadcast the ball position to the other player
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = {
  listenForSocketEvents,
};
