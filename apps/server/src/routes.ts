import express from "express";

import SessionController from "./controllers/SessionController";
import ProfileController from "./controllers/ProfileController";
import LinksController from "./controllers/LinksController";
import authMiddleware from "./middlewares/authMiddleware";

const routes = express.Router();

// Session
routes.post("/api/signin", SessionController.signin);
routes.post("/api/signup", SessionController.signup);

// Profile
routes.get("/api/profile/:slug", ProfileController.show);

// Links
routes.post(
  "/api/links",
  [authMiddleware.verifyContentType, authMiddleware.verifyToken],
  LinksController.create
);
routes.delete(
  "/api/links/",
  [authMiddleware.verifyContentType, authMiddleware.verifyToken],
  LinksController.delete
);
routes.put(
  "/api/links",
  [authMiddleware.verifyContentType, authMiddleware.verifyToken],
  LinksController.edit
);

routes.get("/", (req, res) => {
  res.send("Server running successfully");
});

export default routes;
