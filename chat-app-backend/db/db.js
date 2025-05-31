const mongoose = require('mongoose');

module.exports = async () => { 
    try {
        await mongoose.connect(process.env.MONGOURL || 'mongodb://localhost:27017/chat-app');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};
