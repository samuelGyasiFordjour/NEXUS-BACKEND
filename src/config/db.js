const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {

mongoose.connect('mongodb+srv://Kay:l1Eu0mBQKIAH8tRr@cluster0.toggvcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
   
})
.then(() => console.log('Tipsy Alley MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

};


module.exports = connectDB;
