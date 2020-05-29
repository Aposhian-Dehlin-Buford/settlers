const seedMap = () => {
    let terrain = ['sheep', 'sheep', 'sheep', 'sheep', 'wheat', 'wheat', 'wheat', 'wheat',  'wood', 'wood', 'wood', 'wood', 'clay', 'clay', 'clay', 'rock', 'rock', 'rock', 'desert']

    const getTerrain = (x, y) => {
        return y === 0 || y === 7 ? 'water' :
        (y === 1 || y === 5) ? ((x < 3 || x > 5) ? 'water' : terrainType()) :
        (y === 2 || y === 4) ? ((x < 2 || x > 5) ? 'water' : terrainType()) :
        y === 3 ? ((x < 2 || x > 6) ? 'water' : terrainType()) : 'water'
    }

    const getNumber = (x,y) => {

    }

    const terrainType = () => {
        return terrain.splice(Math.floor(Math.random() * terrain.length), 1)[0]
    }

    return [...Array(7)].map((e,i) => [...Array(9)].map((f,j) => {
        
        return {
            x: j,
            y: i,
            terrain: getTerrain(j, i),
            number: getNumber(j, i)
        }
    }))
}

module.exports = {seedMap}
