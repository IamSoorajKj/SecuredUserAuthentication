import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/agent-app`)
        console.log('MongoDB connected successfully');

    } catch (error) {
        if (error.name === 'MongooseServerSelectionError') {
            console.error('\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: Could not connect to MongoDB Atlas.');
            console.error('\x1b[33m%s\x1b[0m', 'Reason: Connection timed out. This is likely an IP Whitelist issue.');
            console.error('Please ensure your current IP is whitelisted in the MongoDB Atlas dashboard.');
        } else {
            console.error('MongoDB Connection Error:', error);
        }
    }
}

export default connectDB;