const Product = require('../models/Product.js');
const ProductStat = require('../models/ProductStat.js');
const Transactions = require('../models/Transactions.js');
const User = require('../models/User.js');

const getCountryIso3 = require("country-iso-2-to-3")

const getProducts = async(req, res) => {
    try{
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async(product) => {
                const stat = await ProductStat.find({productId: product._id});
                return {
                    ...product._doc,
                    stat
                }
            })
        );

        res.status(200).json(productsWithStats);
    }catch(e){
        res.status(404).json({message: e.message})
    }
}

const getCustomers = async(req, res) => {
    try{
        const customers = await User.find({ role: 'user' }).select("-password");

        res.status(200).json(customers);
    }catch(e){
        res.status(404).json({message: e.message})
    }
}

const getTransactions = async (req, res) => {
    try {
      // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    
        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };
    
            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};
    
        const transactions = await Transactions.find({
            $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);
    
        const total = await Transactions.countDocuments({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        });
    
        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getGeography = async(req, res) => {
    try{
        const users = await User.find();

        const mappedLocations = users.reduce((acc, {country}) => {
            const countryISO3 = getCountryIso3(country); 
            if(!acc[countryISO3]){
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return {id: country, value: count}
            }
        );

        res.status(200).json(formattedLocations);

    }catch(e){
        res.status(404).json({message: e.message})
    }
}

module.exports = {
    getProducts,
    getCustomers,
    getTransactions,
    getGeography
}