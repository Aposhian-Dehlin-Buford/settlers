require("dotenv").config({ path: __dirname + "/../.env" })
const express = require("express")
const session = require("express-session")
const massive = require("massive")
const app = express()
const users = []
const challenges = []
const lobbies = []

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

//Controllers
const authCtrl = require("./controllers/authController"),
  userCtrl = require("./controllers/userController"),
  mapCtrl = require("./controllers/mapController"),
  gameCtrl = require("./controllers/gameController")

//Middleware
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db)
  app.set("users", users)
  app.set("lobbies", lobbies)
  app.set("challenges", challenges)
  console.log("Database connected")
  const io = require("socket.io")(
    app.listen(SERVER_PORT, () =>
      console.log(`Server listening on ${SERVER_PORT}`)
    )
  )
  app.set("io", io)
  io.on("connection", (socket) => {
    console.log("connection")
    socket.on("join", (body) => userCtrl.join(app, body, socket))
    socket.on('leave', () => userCtrl.leave(app, socket))
    socket.on("disconnect", () => userCtrl.leave(app, socket))
    socket.on("challenge", (body) => userCtrl.challenge(app, body))
    socket.on("accept-challenge", (body) => userCtrl.acceptChallenge(app, body))
    socket.on("end-turn", (body) => gameCtrl.endTurn(app, body))
    socket.on("roll-dice", (body) => gameCtrl.rollDice(app, body))
    socket.on("request-trade", (body) => gameCtrl.requestTrade(socket, body))
    socket.on('accept-offer', (body) => gameCtrl.acceptTrade(socket, body))
    socket.on('reject-offer', (body) => gameCtrl.rejectTrade(socket, body))
    socket.on('buy-card', (body) => gameCtrl.buyCard(socket, body))
    socket.on('buy-building', (body) => gameCtrl.buyBuilding(io, body))
  })
})

//Endpoints
//Auth Endpoints
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.get("/auth/user", authCtrl.getUser)

//User Endpoints
app.get("/api/users", userCtrl.getUsers)

// Map Endpoints

// app.get("/api/map", mapCtrl.seed)
