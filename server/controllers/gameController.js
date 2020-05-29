const endTurn = (app, {room}) => {
    const io = app.get('io')
    io.in(room).emit('pass-turn')
}

module.exports = {
    endTurn
}