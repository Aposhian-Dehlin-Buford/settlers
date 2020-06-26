const seedMap = () => {
    let terrain = ['sheep', 'sheep', 'sheep', 'sheep', 'wheat', 'wheat', 'wheat', 'wheat',  'wood', 'wood', 'wood', 'wood', 'clay', 'clay', 'clay', 'rock', 'rock', 'rock', 'desert']
    let numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
    let ports = ["3 for 1"]

    const getSlots = (id, x, y, grid) => {
        const idTile = grid.filter((f,j) => f.id === id)[0]
        // const coor1 = (e) => grid.filter((f,j) => f.x === e[0][0] && f.y === e[0][1])[0]
        // const coor2 = (e) => grid.filter((f,j) => f.x === e[1][0] && f.y === e[1][1])[0]
        // const coor3 = (e) => grid.filter((f,j) => f.x === e[2][0] && f.y === e[2][1])[0]

        // const triangle = [  [0 ,2 ,4],    [1, 3, 5] ]

        const findCoor = (e, num) => grid.filter((f,j) => f.x === e[num][0] && f.y === e[num][1])[0]
        
        const findSlots = (i, ids, num) => {
            const slotNumbers = [
                  [[3,5], [1,5], [1,3]], 
                  [[2,4], [0,4], [0,2]]]

            const slots = [[4,2,0], [5,3,1]].filter((e,j) => e.includes(i)).flat().filter(e => e !== i)

            console.log("slots", i, ids, num, slots)

            // return [ids, slots[num]-1, slots[num]+1]
            return [ids, slotNumbers[i % 2 === 0 ? 0 : 1]]
        }

        const expCoors = (e, i) => {
            let slots1 = [[3,5], [1,5], [1,3], [5,3,1]]
            let slots2 = [[2,4], [0,4], [0,2], [4,2,0]]

            let newArr = e.map(g => grid.filter(f => f.x === g[0] && f.y === g[1])[0]).map(g => g && g.id)
            console.log(newArr, id, i)
            let newAdj = [...newArr.slice(0, 2), id].sort((a,b) => a-b)
            let notAdj = [...newArr.slice(2)].sort((a,b) => a-b)
            let direct = i % 2 === 0 ? [[newAdj[0], slots1[0]], [newAdj[1], slots1[1]], [newAdj[2], slots1[2]]] : [[newAdj[0], slots2[0]], [newAdj[1], slots2[1]], [newAdj[2], slots2[2]]]
            let indirect = i % 2 ? [[notAdj[0], [slots2[3][0]]], [notAdj[1], [slots2[3][1]]], [notAdj[2], [slots2[3][2]]]] : [[notAdj[0], [slots1[3][0]]], [notAdj[1], [slots1[3][1]]], [notAdj[2], [slots1[3][2]]]]

            return [...direct, ...indirect]
        }

        let coors = [
            [[x-1, y-1], [x-1, y], [x-2, y-1], [x, y-1], [x, y+1]],
            [[x-1, y-1], [x, y-1], [x-1, y-2], [x-1, y], [x+1, y]],
            [[x, y-1], [x+1, y], [x+1, y-1], [x-1, y-1], [x+1, y+1]],
            [[x-1, y], [x, y+1], [x-1, y+1], [x-1, y-1], [x+1, y+1]],
            [[x, y+1], [x+1, y+1], [x+1, y+2], [x-1, y], [x+1, y]],
            [[x+1, y], [x+1, y+1], [x+2, y+1], [x, y-1], [x, y+1]],
        ]

        return coors.map((e,i) => [
            idTile, 
            findCoor(e, 0), 
            findCoor(e, 1), 
            0, 
            0, 
            expCoors(e, i),
            // [
            //     [(findCoor(e, 0) && findSlots(i, findCoor(e, 0).id, 0))].flat(), 
            //     [(findCoor(e, 1) && findSlots(i, findCoor(e, 1).id, 1))].flat(), 
            //     [(findCoor(e, 2) && findCoor(e, 2).id), 5-i]
            // ]
        ])
    }

    const numberType = (x,y) => {
        return numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
    }

    const terrainType = () => {
        return terrain.splice(Math.floor(Math.random() * terrain.length), 1)[0]
    }

    let grid = [...Array(19)].map((e,i) => {
        return {
            x: (i < 3 ? i + 1 : i < 7 ? i - 2 : i < 12 ? i - 6 : i < 16 ? i - 10 : i - 13),
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
