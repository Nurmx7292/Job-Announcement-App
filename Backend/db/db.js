const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to DB!");
    } catch (e) {
        console.error("MongoDB connection failed",e);
        process.exit();
    }
};

module.exports = connectToDB;
