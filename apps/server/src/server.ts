import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./database/mongodb";

import routes from "./routes";

dotenv.config();
const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

connectDB();

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
