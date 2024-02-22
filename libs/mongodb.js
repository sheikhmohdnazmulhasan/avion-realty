import mongoose from 'mongoose';

const connectMongoDB = async () => {

    try {
        await mongoose.connect(process.env.MONGOBD_URI);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } catch (error) {

        console.log("There was an error connecting to MangoDB", error);
    }
}

export default connectMongoDB;