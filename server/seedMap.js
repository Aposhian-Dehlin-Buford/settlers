const seedMap = () => {
    let terrain = ['sheep', 'sheep', 'sheep', 'sheep', 'wheat', 'wheat', 'wheat', 'wheat',  'wood', 'wood', 'wood', 'wood', 'clay', 'clay', 'clay', 'rock', 'rock', 'rock', 'desert']
    let numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
    let ports = ["3 for 1"]

    const getSlots = (id, x, y, grid) => {
        let idTile = grid.filter((f,j) => f.id === id)[0]

        return [
            [idTile, grid.filter((f,j) => (f.x === (x-1 & x-1) && f.y === y))[0], id < 13 ? grid.filter((f,j) => (f.x === (x-1 & x-1) && f.y === (y-1 & y-1)))[0] : grid.filter((f,j) => (f.x === x && f.y === (y-1 & y-1)))[0], 0, 0],

            [idTile, id  < 13 ? grid.filter((f,j) => f.x === (x-1 & x-1) && f.y === (y-1 & y-1))[0] : grid.filter((f,j) => f.x === (x+1 & x+1) && f.y === (y-1 & y-1))[0], grid.filter((f,j) => f.x === x && f.y === (y-1 & y-1))[0], 0, 0],

            [idTile, grid.filter((f,j) => f.x === (x+1 & x+1) && f.y === y)[0], id < 13 ? grid.filter((f,j) => f.x === x && f.y === (y-1 & y-1))[0] : grid.filter((f,j) => f.x === (x+1 & x+1) && f.y === (y-1 & y-1))[0], 0, 0],

            [idTile, grid.filter((f,j) => f.x === (x-1 & x-1) && f.y === y)[0], id < 8 ? grid.filter((f,j) => f.x === x && f.y === (y+1 & y+1))[0] : grid.filter((f,j) => f.x === (x-1 & x-1) && f.y === (y+1 & y+1))[0], 0, 0],

            [idTile, grid.filter((f,j) => f.x === x && f.y === (y+1 & y+1))[0], id < 8 ? grid.filter((f,j) => f.x === (x+1 & x+1) && f.y === (y+1 & y+1))[0] : grid.filter((f,j) => f.x === (x-1 & x-1) && f.y === (y+1 & y+1))[0], 0, 0],

            [idTile, grid.filter((f,j) => f.x === (x+1 & x+1) && f.y === y)[0], id < 8 ? grid.filter((f,j) => f.x === (x+1 &  x+1) && f.y === (y+1 & y+1))[0] : grid.filter((f,j) => f.x === x && f.y === (y+1 & y+1))[0], 0, 0]
        ]

    }

    const numberType = (x,y) => {
        return numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
    }

    const terrainType = () => {
        return terrain.splice(Math.floor(Math.random() * terrain.length), 1)[0]
    }

    let grid = [...Array(19)].map((e,i) => {
        return {
            x: (i < 3 ? i + 1 : i < 7 ? i - 2 : i < 12 ? i - 6 : i < 16 ? i - 11 : i - 15),
            y: (i < 3 ? 1 : i < 7 ? 2 : i < 12 ? 3 : i < 16 ? 4 : 5),
            id: i+1,
            terrain: terrain[0] ? terrainType() : ports[0]
        }
    })

    let numGrid = grid.map((e,i) => {
        return {
            number: e.terrain !== 'desert' ? numberType() : null,
            ...e,
        }
    })

    let slotsGrid = numGrid.map((e,i) => {
        return {
            slots: getSlots(e.id, e.x, e.y, numGrid),
            ...e
        }
    })

    return slotsGrid;
}

module.exports = {seedMap}
