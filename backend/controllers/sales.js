const OverallStat = require('../models/OverallStat.js');

const getSales = async(req, res) => {
    try{
        const overallStats = await OverallStat.find({});
        res.status(200).json(overallStats[0]);
    }catch(err){
        res.status(404).json({message: e.message})
    }
};

module.exports = {
    getSales
}