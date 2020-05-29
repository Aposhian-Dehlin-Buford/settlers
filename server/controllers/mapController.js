const {seedMap} = require('../seedMap');

module.exports = {
    seed: (req, res) => {
        console.log("seedMap", seedMap())
        return res.status(200).send(seedMap())
    }
}