const seedMap = () => {
    let terrain = ['sheep', 'sheep', 'sheep', 'sheep', 'wheat', 'wheat', 'wheat', 'wheat',  'wood', 'wood', 'wood', 'wood', 'clay', 'clay', 'clay', 'rock', 'rock', 'rock', 'desert']
    let numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 13]

    const getTerrain = (x, y) => {
        return (y === 0 || y === 6) ? (x === 1 || x === 3) ? 'port' : 'water' :
        (y === 1 || y === 5) ? (x < 2 || x > 4) ? x === 5 ? 'port' : 'water' : terrainType() :
        (y === 2 || y === 4) ? (x < 1 || x > 4) ? x === 0 ? 'port' : 'water' : terrainType() :
        y === 3 ? (x < 1 || x > 5) ? x === 6 ? 'port' : 'water' : terrainType() : 'water'
    }

    const getNumber = (x, y) => {
        return y === 0 || y === 7 ? null :
        (y === 1 || y === 5) ? ((x < 2 || x > 4) ? null : numberType()) :
        (y === 2 || y === 4) ? ((x < 1 || x > 4) ? null : numberType()) :
        y === 3 ? ((x < 1 || x > 5) ? null : numberType()) : null
    }

    const numberType = (x,y) => {
        return numbers.splice(Math.floor(Math.random() * terrain.length), 1)[0]
    }

    const terrainType = () => {
        return terrain.splice(Math.floor(Math.random() * terrain.length), 1)[0]
    }

    return [...Array(7)].map((e,i) => [...Array(7)].map((f,j) => {
        
        return {
            x: j,
            y: i,
            terrain: getTerrain(j, i),
            number: getNumber(j, i)
        }
    }))
}

module.exports = {seedMap}
