import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./database/mongodb";

import SessionController from "./controllers/SessionController";
import ProfileController from "./controllers/ProfileController";
import LinksController from "./controllers/LinksController";
import authMiddleware from "./middlewares/authMiddleware";

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

// Session
app.post("/api/signin", SessionController.signin);
app.post("/api/signup", SessionController.signup);

// Profile
app.get("/api/profile/:slug", ProfileController.show);

// Links
app.post(
  "/api/links",
  [authMiddleware.verifyContentType, authMiddleware.verifyToken],
  LinksController.create
);
app.delete(
  "/api/links/",
  [authMiddleware.verifyContentType, authMiddleware.verifyToken],
  LinksController.delete
);
app.put(
  "/api/links",
  [authMiddleware.verifyContentType, authMiddleware.verifyToken],
  LinksController.edit
);

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
