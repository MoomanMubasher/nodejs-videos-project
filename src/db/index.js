import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}/${DB_NAME}`)
        console.log("CONNECTION SUCCESS");
        console.log("CONNECTED DB", connectionInstance.connection.name);
        console.log("CONNECTED PORT", connectionInstance.connection.port);
        console.log("CONNECTION HOST", connectionInstance.connection.host);
    } catch (error) {
        console.log("DB Connection FAILED", error);
        process.exit(1)
        // throw error
    }

}

export default connectDB