const User = require('../models/User.js');
const Transactions = require('../models/Transactions.js');
const { default: mongoose } = require('mongoose');

const getAdmins = async(req, res) => {
    try{
        const admins = await User.find({role: 'admin'}).select('-password');
        res.status(200).json(admins);
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

const getUserPerformance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const userWithStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "affiliatestats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats",
          },
        },
        { $unwind: "$affiliateStats" },
      ]);
  
      const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
          return Transactions.findById(id);
        })
      );
      const filteredSaleTransactions = saleTransactions.filter(
        (transaction) => transaction !== null
      );
  
      res
        .status(200)
        .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
        console.log(error);
      res.status(404).json({ message: error.message });
    }
  };

module.exports = {
    getAdmins,
    getUserPerformance
}