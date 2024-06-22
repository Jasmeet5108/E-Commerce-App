import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!).then(() => console.log("DB Connected")).catch(() => console.log("Connection Failed")
        )
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}