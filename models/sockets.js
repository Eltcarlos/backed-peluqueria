const {
  getCash,
  sendCashRegister,
  getReservations,
  sendReservation,
  sendReservationByID,
} = require("../controllers/socket");
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

      socket.on("list-cash", async (payload) => {
        await sendCashRegister(payload);
        this.io.to("admin").emit("list-cash", await getCash());
      });

      socket.on("list-reservation", async (payload) => {
        await sendReservation(payload);
        this.io.to("admin").emit("list-reservation", await getReservations());
      });

      socket.on("list-reservationByID", async (payload) => {
        await sendReservationByID(payload);
        this.io.to("admin").emit("list-reservationByID", await getReservations());
      });

      socket.on("disconnect", async () => {
        this.io.to("admin").emit("list-cash", await getCash());
      });
    });
  }
}

module.exports = Sockets;
