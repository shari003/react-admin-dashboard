const User = require('../models/User.js');
const OverallStat = require('../models/OverallStat.js');
const Transactions = require('../models/Transactions.js');

const getUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        delete user.password;
        res.status(200).json(user);
    }catch(e){
        res.status(404).json({message: e.message})
    }
}

const getDashboardStats = async(req, res) => {
    try{
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        const transactions = await Transactions.find().limit(50).sort({createdOn: -1})

        const overallStats = await OverallStat.find({year: currentYear});

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStats[0];

        const thisMonthStats = overallStats[0].monthlyData.find(({month}) => {
            return month === currentMonth;
        });

        const todayStats = overallStats[0].dailyData.find(({date}) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        });

    }catch(e){
        res.status(404).json({message: e.message})
    }
}

module.exports = {
    getUser,
    getDashboardStats
};