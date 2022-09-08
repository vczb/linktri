import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./database/mongodb";

import SessionController from "./controllers/SessionController";
import ProfileController from "./controllers/ProfileController";

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

app.post("/api/signin", SessionController.signin);
app.post("/api/signup", SessionController.signup);
app.get("/api/profile/:slug", ProfileController.show);

app.get("/", (req, res) => {
  res.send("Deployed successfully");
});

app.get("/api/ok", (req: any, res: any) => {
  return res.status(200).send({ message: "ok", time: new Date() });
});

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
