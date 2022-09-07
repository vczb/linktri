import mongoose from "mongoose";

const isProd = process.env.NODE_ENV === "production";

const connectDB = () => {
  mongoose
    .connect(isProd ? process.env.DB_URL : process.env.DB_URL_DEV)
    .then(() => {
      console.log(
        `Successfully connect to ${
          isProd ? "production" : "development"
        } MongoDB.`
      );
    })
    .catch((err: Error) => {
      console.error("Connection error", err);
      process.exit();
    });
};

export default connectDB;
