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
const authCtrl = require('./controllers/authController'),
  mapCtrl = require('./controllers/mapController')

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
    app.set('users', users)
    app.set('lobbies', lobbies)
    app.set('challenges', challenges)
    console.log("Database connected")
    const io = require("socket.io")(
      app.listen(SERVER_PORT, () =>
        console.log(`Server listening on ${SERVER_PORT}`)
      )
    )
    app.set("io", io)
    io.on("connection", (socket) => {
    //   socket.on('disconnect', () => userCtrl.leave(app, socket))
    //   socket.on('join', (body) => userCtrl.join(app, body, socket))
    //   socket.on('challenge', (body) => lobbyCtrl.challenge(app, body))
    //   socket.on('accept-challenge', (body) => lobbyCtrl.acceptChallenge(app, body))
    //   socket.on('end-turn', (body) => gameCtrl.endTurn(app, socket, body))
    })
  })

  //Endpoints
  //Auth Endpoints
//   app.post("/auth/register", authCtrl.register)
// app.post("/auth/login", authCtrl.login)
// app.post("/auth/logout", authMid.usersOnly, authCtrl.logout)
// app.get("/auth/user", authMid.usersOnly, authCtrl.getUser)

// Map Endpoints

app.get('/api/map', mapCtrl.seed);