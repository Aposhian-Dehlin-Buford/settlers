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

const acceptTrade = (socket, { room, offer, request }) => {
  socket.to(room).emit("accept-offer", {offer, request})
}
const rejectTrade = (socket, { room }) => {
  socket.to(room).emit("reject-offer")
}

const buyCard = (socket, {room, deck}) => {
  socket.to(room).emit('buy-card', {deck})
}

const buyBuilding = (socket, {room, buildingsArray, map}) => {
  socket.to(room).emit('buy-building', {buildingsArray, newMap: map})
}

module.exports = {
  endTurn,
  rollDice,
  requestTrade,
  acceptTrade,
  rejectTrade,
  buyCard,
  buyBuilding
}
