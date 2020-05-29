const { seedMap } = require("../seedMap")

const removeSocketId = (users) =>
  users.map(({ username, email, user_id }) => ({
    username,
    email,
    user_id,
  }))

const removeUserFromList = (app, socket) => {
  const io = app.get("io")
  const users = app.get("users")
  const { userIndex, user_id } = users.reduce(
    (acc, e, i) => {
      if (e.socket_id === socket.id) {
        acc.userIndex = i
        acc.user_id = e.user_id
      }
      return acc
    },
    { userIndex: null, user_id: null }
  )
  users.splice(userIndex, 1)
  app.set("users", users)
  socket.leave("userlist")
  io.in("userlist").emit("users", removeSocketId(users))
  return user_id
}
const removeUserChallenges = (user_id, app) => {
  const io = app.get("io")
  const challenges = app.get("challenges")
  const updatedChallenges = challenges.filter((c) => {
    if (c.challenger.user_id === user_id || c.opponent.user_id === user_id) {
      return null
    } else {
      return c
    }
  })
  app.set("challenges", updatedChallenges)
  io.in("userlist").emit("remove-challenge", { user_id })
}
const removeUserFromGame = (user_id, app) => {
  const lobbies = app.get("lobbies")
  const newLobbies = lobbies.filter(
    (e) => e.players[0].user_id !== user_id && e.players[1].user_id !== user_id
  )
  console.log(newLobbies)
  app.set('lobbies', newLobbies)
  //emit remove game command to remove other user from game
}
const generateInitialGameState = (
  io,
  { challenger, opponent },
  challengerSocket,
  opponentSocket
) => {
  const activePlayer = Math.floor(Math.random() * 2 < 1) ? 0 : 1
  const state = {
    active: false,
    gameStart: true,
    room: `${challenger.user_id}-${opponent.user_id}`,
    activePlayer,
    rolledDice: false,
    diceResult: [0,0],
    players: [challenger, opponent],
    resources: { sheep: 3, wood: 3, clay: 3, wheat: 3, rock: 3 },
    opponentsInfo: [
      { resources: { sheep: 3, wood: 3, clay: 3, wheat: 3, rock: 3 } },
    ],
    map: seedMap(),
    // buildings: {},
    // units: {},
  }
  io.sockets.connected[challengerSocket.socket_id]
    .join(state.room)
    .emit("game-start", state)
  io.sockets.connected[opponentSocket.socket_id]
    .join(state.room)
    .emit("game-start", state)
}

const findChallengeIndex = (challenges, body) => {
  const { challenger, opponent } = body
  return challenges.findIndex((c) => {
    if (
      (c.challenger.user_id === challenger.user_id &&
        c.opponent.user_id === opponent.user_id) ||
      (c.challenger.user_id === opponent.user_id &&
        c.opponent.user_id === challenger.user_id)
    ) {
      return c
    }
  })
}

module.exports = {
  removeSocketId,
  removeUserFromList,
  removeUserChallenges,
  removeUserFromGame,
  generateInitialGameState,
  findChallengeIndex,
}
