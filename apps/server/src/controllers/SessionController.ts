import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/UserModel";

const SessionController = {
  signin: (req, res) => {
    User.findOne({
      email: req.body.email,
    }).exec((err: Error, user) => {
      if (err) {
        console.log("err", err);
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const secret = process.env.SECRET;

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        email: user.email,
        accessToken: token,
      });
    });
  },
  signup: (req, res) => {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err: Error, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({
        message: "User was registered successfully!",
        user: { id: user.id, email: user.email },
      });
    });
  },
};

export default SessionController;
