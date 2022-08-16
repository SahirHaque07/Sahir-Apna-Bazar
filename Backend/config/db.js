import mongoose from "mongoose";
import colors from "colors";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Mongo DB Connected on ${conn.connection.host}`.yellow.underline
    );
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
};

export default connectDb;
