require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require('morgan');
const helmet = require('helmet');

const clientRoutes = require('./routes/client.js');
const generalRoutes = require('./routes/general.js');
const managementRoutes = require('./routes/management.js');
const salesRoutes = require('./routes/sales.js');

// const info = require("./data/jsondata.json");
// const Data = require("./models/Data.js");
const User = require('./models/User.js');
const Product = require('./models/Product.js');
const ProductStat = require('./models/ProductStat.js');
const Transactions = require('./models/Transactions.js');
const OverallStat = require('./models/OverallStat.js');
const AffiliateStat = require('./models/AffiliateStat.js');
const {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} = require('./data/data.js');

const app = express();

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({extended: true, limit: '30mb'}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

const PORT = process.env.PORT || 3001;

// ROUTES
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, async() => {
        // await User.insertMany(dataUser);
        // await Product.insertMany(dataProduct);
        // await ProductStat.insertMany(dataProductStat);
        // await Transactions.insertMany(dataTransaction);
        // await OverallStat.insertMany(dataOverallStat);
        // await AffiliateStat.insertMany(dataAffiliateStat);
        console.log(`Server started at PORT: ${PORT}`);
        console.log(`Mongoose Connection Success`);
    });
}).catch(err => {
    console.log(err);
})