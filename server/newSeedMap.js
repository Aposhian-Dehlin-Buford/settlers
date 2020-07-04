const seedMap = () => {
    let terrain = ['sheep', 'sheep', 'sheep', 'sheep', 'wheat', 'wheat', 'wheat', 'wheat',  'wood', 'wood', 'wood', 'wood', 'clay', 'clay', 'clay', 'rock', 'rock', 'rock', 'desert']
    let numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
    let ports = ["3 for 1", "3 for 1", "3 for 1", "3 for 1", "clay", "rock", "wheat", "sheep", "wood"]
    let portSlots = [
        [[0,1], [4,0]], 
        [[1,1], [6,0]], 
        [[7,1], [13,0]], 
        [[9,0], [9,1]], 
        [[20,0], [20,1]], 
        [[22,0], [22,1]], 
        [[26,1], [31,0]], 
        [[28,1], [33,0]], 
        [[30,1], [34,0]]]

    let desert = null
        
    let tiles = [
                   1,0, 1, 0, 
                 0, 2, 2, 2, 1, 
                1, 2, 2, 2, 2, 0, 
               0, 2, 2, 2, 2, 2,1, 
                1, 2, 2, 2, 2, 0, 
                 0, 2, 2, 2, 1, 
                   1,0, 1, 0
                ]

    const getSlots = (id, x, y, z, grid) => {

        const idTile = (id) => grid.filter((f,j) => f.id === id)[0]
        const one = grid.filter(f => f.x === x+1 && f.y === y-1 && f.z === z)[0]
        const two = grid.filter(f => f.x === x+1 && f.y === y && f.z === z+1)[0]
        const three = grid.filter(f => f.x === x-1 && f.y === y+1 && f.z === z)[0]
        const four = grid.filter(f => f.x === x-1 && f.y === y && f.z === z-1)[0]

        const disable = (slot) => {
            const disable = slot === 0 ? 
                [id, four && four.id, three && three.id] : 
                [id, one && one.id, two && two.id]
            return disable
        }

        const adjacent0 = [idTile(id), idTile(id+1), three, 0, 0, disable(0)]
        const adjacent1 = [idTile(id), idTile(id+1), two, 0, 0, disable(1)]

        return [adjacent0, adjacent1]
    }

    const getRoads = (id, x, y, z, grid) => {
        const one = grid.filter(f => f.x === x-1 && f.y === y && f.z === z-1)[0]
        const two = grid.filter(f => f.x === x+1 && f.y === y-1 && f.z === z)[0]

        return [[[id, 0],[one && one.id, 1]], [[id, 0], [id, 1]], [[id, 1], [two && two.id, 0]]]
    }

    const numberType = (x,y) => {
        return numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
    }

    const terrainType = (e) => {
            return e === 0 ? "water" :
                    e === 1 ? "port" :
                    e === 2 ? terrain.splice(Math.floor(Math.random() * terrain.length), 1)[0] : null
    }

    const indexX = [0,0,0,0, 1,1,1,1,1, 2,2,2,2,2,2, 3,3,3,3,3,3,3, 4,4,4,4,4,4, 5,5,5,5,5, 6,6,6,6]
    const indexY = [3,4,5,6, 2,3,4,5,6, 1,2,3,4,5,6, 0,1,2,3,4,5,6, 0,1,2,3,4,5, 0,1,2,3,4, 0,1,2,3]
    const indexZ = [0,1,2,3, 0,1,2,3,4, 0,1,2,3,4,5, 0,1,2,3,4,5,6, 1,2,3,4,5,6, 2,3,4,5,6, 3,4,5,6]
    const indexW = [3,3,3,3, 3,2,2,2,3, 3,2,1,1,2,3, 3,2,1,0,1,2,3, 3,2,1,1,2,3, 3,2,2,2,3, 3,3,3,3]

    let coorGrid = tiles.map((e,i) => {
        return {
            id: i,
            w: indexW[i],
            x: indexX[i],
            y: indexY[i],
            z: indexZ[i],
            terrain: terrainType(e)
        }
    })

    let numGrid = coorGrid.map((e,i) => {
        if(e.terrain === 'desert'){
            desert = e.id
        }
        return {
            number: ['desert', 'port', 'water'].includes(e.terrain) ? null : numberType(),
            type: e.terrain === "port" ? ports.splice(Math.floor(Math.random() * ports.length), 1)[0] : null,
            portID: e.terrain === "port" ? 8 - ports.length : null,
            portSlots: e.terrain === "port" ? portSlots.shift() : null,
            hasRobber: e.terrain === 'desert' ? true : false,
            ...e,
        }
    })

    // let portGrid = numGrid.map((e,i) => {
    //     return {
    //         ...e,
    //         portSlots: e.

    //     }
    // })

    let adjNumGrid = numGrid.map((e,i) => {
        return {
            slots: getSlots(e.id, e.x, e.y, e.z, numGrid),
            ...e
        }
    })

    let roadGrid = adjNumGrid.map((e,i) => {
        return {
            ...e,
            roads: getRoads(e.id, e.x, e.y, e.z, adjNumGrid)
        }
    })

    return [roadGrid, desert]
}

module.exports = {seedMap}
