import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/mongodb";

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

connectDB();

app.get("/", (req, res) => {
  res.send("Deployed successfully");
});

app.get("/api/ok", (req: any, res: any) => {
  return res.status(200).send({ message: "ok", time: new Date() });
});

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
