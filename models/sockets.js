const { validateJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      //Validate JWT
      // if the token is not valid, disconnect
      const [valido, uid] = validateJWT(socket.handshake.query["x-token"]);
      if (!valido) {
        return socket.disconnect();
      }

      // Connect to user at room // this.io.to('sala-gamer').emit
      socket.join("admin");
    });
  }
}

module.exports = Sockets;
