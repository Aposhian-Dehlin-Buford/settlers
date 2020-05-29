const endTurn = (app, { room }) => {
  const io = app.get("io")
  io.in(room).emit("pass-turn")
}

const rollDice = (app, { room }) => {
  const io = app.get("io")
  const diceResult = [
    Math.ceil(Math.random() * 6),
    Math.ceil(Math.random() * 6),
  ]
  io.in(room).emit("dice-result", { diceResult })
}

const requestTrade = (socket, { offer, request, room }) => {
  socket.to(room).emit("request-trade", { offer, request })
}

const acceptTrade = (socket, { room }) => {
  socket.to(room).emit("accept-offer")
}
const rejectTrade = (socket, { room }) => {
  socket.to(room).emit("reject-offer")
}

module.exports = {
  endTurn,
  rollDice,
  requestTrade,
  acceptTrade,
  rejectTrade
}
