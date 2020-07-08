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
  console.log(`roll: ${diceResult[0]+diceResult[1]}`)
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

const buyBuilding = (io, {room, buildingsArray, map}) => {
  io.to(room).emit('buy-building', {buildingsArray, newMap: map})
}

const buyRoad = (io, {room, roadsArray, map}) => {
  io.to(room).emit('buy-road', {roadsArray, newMap: map})
}

const monopoly = (socket, {room, card}) => {
  socket.to(room).emit('monopoly', {card})
}

const resolveMonopoly = (socket, {room, card, count}) => {
  socket.to(room).emit('resolve-monopoly', {card, count})
}

const playKnight = (socket, {room}) => {
  socket.to(room).emit('play-knight')
}

const moveRobber = (socket, {room, location, map}) => {
  socket.to(room).emit('move-robber', {location, newMap: map})
}

const updateOppRes = (socket, {room, oppRes}) => {
  socket.to(room).emit('update-opponent-res', {oppRes})
}

module.exports = {
  endTurn,
  rollDice,
  requestTrade,
  acceptTrade,
  rejectTrade,
  buyCard,
  buyBuilding,
  buyRoad,
  monopoly,
  resolveMonopoly,
  playKnight,
  moveRobber,
  updateOppRes,
}
