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
        res.status(500).send({ ok: false, message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ ok: false, message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          ok: false,
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const secret = process.env.SECRET;

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        ok: true,
        email: user.email,
        accessToken: token,
      });
    });
  },
  signup: (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err: Error & { code: number }, user) => {
      if (err) {
        let message = "Unespected error";

        if (err.code === 11000) {
          message = "User already exists";
        }

        res.status(500).send({ ok: false, message });
        return;
      }

      res.send({
        ok: true,
        message: "User was registered successfully!",
        user: { id: user.id, username: user.username, email: user.email },
      });
    });
  },
};

export default SessionController;
