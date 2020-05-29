const endTurn = (app, {room}) => {
    const io = app.get('io')
    io.in(room).emit('pass-turn')
}

const rollDice = (app, {room}) => {
    const io = app.get('io')
    const diceResult = [Math.ceil(Math.random()* 6), Math.ceil(Math.random()* 6)]
    console.log(diceResult)
    io.in(room).emit('dice-result', {diceResult})
}

module.exports = {
    endTurn,
    rollDice
}