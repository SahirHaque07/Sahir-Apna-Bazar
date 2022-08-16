import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import path from "path";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./Middleware/errorMiddleware.js";
import { authController } from "./controllers/userController.js";
import colors from "colors";
const app = express();

//dotenv config

dotenv.config();

//MongoDB Connecting

connectDb();

//Routing from Routes

app.use(express.json());
app.use(errorHandler);
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Server is Running</h1>");
  });
}

app.use(notFound);

const PORT = 8080;

app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server is Running in ${process.env.NODE_ENV} mode on ${process.env.PORT}`
      .cyan.underline
  );
});

//Routing of same file
// app.get("/products", (req, res) => {
//   res.json(products);
// });

//Routing for single product
// app.get("/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === Number(req.params.id));
//   res.json(product);
// });
