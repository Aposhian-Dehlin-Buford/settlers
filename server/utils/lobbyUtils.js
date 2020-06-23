const { seedMap } = require("../seedMap")
const { seedDeck } = require("./seedDeck")

const removeSocketId = (users) =>
  users.map(({ username, email, user_id }) => ({
    username,
    email,
    user_id,
  }))

const removeUserFromList = (app, socket) => {
  try{

    const io = app.get("io")
    const users = app.get("users")
    // const { userIndex, user_id } = users.reduce(
    //   (acc, e, i) => {
    //     if (e.socket_id === socket.id) {
    //       acc.userIndex = i
    //       acc.user_id = e.user_id
    //     }
    //     return acc
    //   },
    //   { userIndex: null, user_id: null }
    // )
    const user = users.find(e => e.socket_id === socket.id)
    const filteredUsers = users.filter(e => +e.user_id !== +user.user_id)
    // users.splice(userIndex, 1)
    // console.log(filteredUsers)
    app.set("users", filteredUsers)
    socket.leave("userlist")
    io.in("userlist").emit("users", removeSocketId(filteredUsers))
    return user.user_id
  }catch{
    return null
  }
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
  const io = app.get("io")
  const users = app.get("users")
  const newLobbies = lobbies.filter(
    (e) => e.players[0].user_id !== user_id && e.players[1].user_id !== user_id
  )
  app.set("lobbies", newLobbies)
  const removeLobbies = lobbies
    .filter(
      (e) =>
        e &&
        e.players &&
        e.players[0] &&
        e.players[1] &&
        (e.players[0].user_id === user_id || e.players[1].user_id === user_id)
    )
    .reduce((acc, e) => {
      if (e.players[0].user_id === user_id) {
        acc.push(e.players[1])
      } else {
        acc.push(e.players[0])
      }
      return acc
    }, [])
  if (removeLobbies.length > 0) {
    const opponentSocket = users.find(
      (u) => +removeLobbies[0].user_id === +u.user_id
    )
    if (opponentSocket && opponentSocket.socket_id) {
      io.to(opponentSocket.socket_id).emit("opponent-left")
    }
  }
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
    buildSettlement: false,
    room: `${challenger.user_id}-${opponent.user_id}`,
    activePlayer,
    rolledDice: false,
    diceResult: [0, 0],
    players: [challenger, opponent],
    resources: { sheep: 3, wood: 3, clay: 3, wheat: 3, rock: 3 },
    // opponentsInfo: [
    //   { resources: { sheep: 3, wood: 3, clay: 3, wheat: 3, rock: 3 } },
    // ],
    buildings: [...Array(20)].map(e => [...Array(6)].map((f,j) => j)),
    numBuildings: [],
    developmentDeck: seedDeck(),
    developmentHand: [],
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
