const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
        userId: String,
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number
        }
    },
    {
        timestamps: true
    }
);

const Transactions = mongoose.model('Transaction', transactionSchema);

module.exports = Transactions;