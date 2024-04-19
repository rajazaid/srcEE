import mongoose from "mongoose";

let cachedConnection:any = null;
export const connectToDatabase = async() => {
    if(cachedConnection) return cachedConnection;
    try {
        console.log(process.env.MONGODB_URI);
        const connection = await mongoose.connect(process.env.MONGODB_URI!, {
            dbName:'dashboard',
            bufferCommands:true
        });
        cachedConnection = connection;
        console.log("DB Connected");
        
        return connection;
    } catch (error) {
        console.log("Error while connecting to database.");
        
    }
}