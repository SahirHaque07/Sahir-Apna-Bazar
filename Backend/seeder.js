import mongoose from "mongoose";
import color from "colors";
import Product from "./models/productModel.js";
import Order from "./models/OrderModel.js";
import User from "./models/UserModel.js";
import users from "./data/Users.js";
import connectDb from "./config/db.js";
import products from "./data/products.js";
import dotenv from "dotenv";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleData);
    console.log(`Data Imported !`.yellow.inverse);
    process.exit(1);
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const dataDestroy = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data Destroyed !`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}
