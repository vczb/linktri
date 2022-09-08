import { NextFunction, Response, Request } from "express";

const jwt = require("jsonwebtoken");

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const secret = process.env.SECRET;

  jwt.verify(token, secret, (err: Error, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.body.userId = decoded.id;
    next();
  });
};

const verifyContentType = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["content-type"];

  if (!token) {
    return res.status(415).send({
      message:
        "'Content-type' header is not valid. Only 'application/json' is allowed.",
    });
  }

  next();
};

export default {
  verifyToken,
  verifyContentType,
};
