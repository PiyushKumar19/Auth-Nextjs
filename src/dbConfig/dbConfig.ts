import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        var connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDb connected successfully :)");
        })

        connection.on('error', (err) => {
            console.log("Could not access mongo db, make sure it is running properly or the creds are correct." + err);
            process.exit;
        })
    } catch (error) {
        console.log("Connection can not be established");
        console.log(error);
    }

} 