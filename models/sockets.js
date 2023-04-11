const { userConnect, userDisconnect, getUsers } = require("../controllers/socket");
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
      //know users are active to UID
      await userConnect(uid);

      // Connect to user at room // this.io.to('sala-gamer').emit
      socket.join(uid);

      //send all users connect
      this.io.emit("list-users", await getUsers());
      // socket join, uid
      // listen when client send a message
      // disconnect
      // offline - in db
      //send all users connect
      socket.on("disconnect", async () => {
        await userDisconnect(uid);
        this.io.emit("list-users", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
