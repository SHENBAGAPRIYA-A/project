// var express =require('express')
// var app=express();
// const mongoose=require('mongoose');
// mongoose.
//     connect('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
//     .then(console.log("Connected to mongo.."));

// app.get('/',async(req,res)=>{
//     const data=await data.find();
//     res.send(data);
// })
// app.listen(7001,()=>{
//     console.log('Server is running...');
// })

// const express = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const port = 7001;

// // Middleware
// app.use(cors());
// app.use(express.json());


// mongoose.connect('mongodb://localhost:27017/ecom')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Define a schema and model
// const DataSchema = new mongoose.Schema({
//     id:Number,
//     title: String,
//     price: Number,
//     description:String,
//     category:String,
//     image:String,
//     sold:String,
//     dateOfSale:String
// });
// const DataModel = mongoose.model('Data', DataSchema);
// app.post('/fetch-and-store', async (req, res) => {
//     try {
//         const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
//         const data = response.data;
//         // Insert data into MongoDB
//         if (Array.isArray(data)) {
//             await DataModel.insertMany(data);
//         } else {
//             await DataModel.create(data);
//         }
//         res.status(200).send('Data has been successfully stored in MongoDB.');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while fetching and storing data.');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running ...`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const port = 7001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/ecom')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Define a schema and model
// const DataSchema = new mongoose.Schema({
//     id: Number,
//     title: String,
//     price: Number,
//     description: String,
//     category: String,
//     image: String,
//     sold: String,
//     dateOfSale: String,
// });

// const DataModel = mongoose.model('Data', DataSchema);
// app.get('/',async(req,res)=>{
//     try{
//         const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
//         const datas = response.data;
//         await DataModel.deleteMany({});
//         await DataModel.insertMany(datas); 
//         res.status(200).send('Data has been successfully stored in MongoDB.');
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while fetching and storing data.');
//     }
// })



// app.get('/data', async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const size = parseInt(req.query.size) || 100;
//       const skip = (page - 1) * size;
//       const items = await DataModel.find().skip(skip).limit(size);
//       const totalItems = await DataModel.countDocuments();
//       res.json({
//         data: items
//       });
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });
//   const getPriceRange = (price) => {
//     if (price <= 100) return '0-100';
//     if (price <= 200) return '101-200';
//     if (price <= 300) return '201-300';
//     if (price <= 400) return '301-400';
//     if (price <= 500) return '401-500';
//     if (price <= 600) return '501-600';
//     if (price <= 700) return '601-700';
//     if (price <= 800) return '701-800';
//     if (price <= 900) return '801-900';
//     return '901-above';
// };

// // Endpoint to get bar chart data
// app.get('/barchart', async (req, res) => {
//     try {
//         const month = parseInt(req.query.month);

//         if (!month || month < 1 || month > 12) {
//             return res.status(400).send('Invalid month. Please provide a month between 1 and 12.');
//         }
//         const startDate = new Date(new Date().getFullYear(), month - 1, 1);
//         const endDate = new Date(new Date().getFullYear(), month, 0);
//         const items = await DataModel.find({
//             dateOfSale: { $gte: startDate, $lt: endDate }
//         });
//         const priceRanges = {
//             '0-100': 0,
//             '101-200': 0,
//             '201-300': 0,
//             '301-400': 0,
//             '401-500': 0,
//             '501-600': 0,
//             '601-700': 0,
//             '701-800': 0,
//             '801-900': 0,
//             '901-above': 0,
//         };

//         items.forEach(item => {
//             const range = getPriceRange(item.price);
//             priceRanges[range]++;
//         });

//         res.json(priceRanges);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });
// app.listen(port, () => {
//     console.log(`Server running .....`);
// });
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 7001;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecom')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model
const DataSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date,
});

const DataModel = mongoose.model('Data', DataSchema);

// Endpoint to fetch data and store in MongoDB
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const datas = response.data;
        await DataModel.deleteMany({});
        await DataModel.insertMany(datas);
        res.status(200).send('Data has been successfully stored in MongoDB.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and storing data.');
    }
});

// Endpoint to get paginated data
app.get('/data', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const skip = (page - 1) * size;
        const items = await DataModel.find().skip(skip).limit(size);
        const totalItems = await DataModel.countDocuments();
        res.json({
            data: items
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/statistics', async (req, res) => {
    try {
        const month = parseInt(req.query.month);

        if (!month || month < 1 || month > 12) {
            return res.status(400).send('Invalid month. Please provide a month between 1 and 12.');
        }

        // Calculate start and end dates for the selected month
        const startDate = new Date(new Date().getFullYear(), month - 1, 1);
        const endDate = new Date(new Date().getFullYear(), month, 0);

        console.log(startDate,endDate);

        // Query MongoDB for items sold in the selected month
        const soldItems = await DataModel.find({
            sold: true,
            dateOfSale: { $gte: startDate, $lt: endDate }
        });

        // Calculate total sale amount and count sold and not sold items
        let totalSaleAmount = 0;
        let totalSoldItems = 0;
        let totalNotSoldItems = 0;

        soldItems.forEach(item => {
            totalSaleAmount += item.price; // Assuming price is stored in cents or dollars
            if (item.sold) {
                totalSoldItems++;
            } else {
                totalNotSoldItems++;
            }
        });

        res.json({
            totalSaleAmount: totalSaleAmount,
            totalSoldItems: totalSoldItems,
            totalNotSoldItems: totalNotSoldItems
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});



app.listen(port, () => {
    console.log(`Server running ...`);
});

