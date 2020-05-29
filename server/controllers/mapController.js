const {seedMap} = require('../seedMap');

module.exports = {
    seed: (req, res) => {
        return res.status(200).send(seedMap())
    }
}