import User from "../models/UserModel";
import Links from "../models/LinksModel";

const ProfileController = {
  show: async (req, res) => {
    const user = await User.findOne({
      username: req.params.slug,
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const links = await Links.find({
      user,
    });

    const { email, username } = user;

    res.status(200).send({
      ok: true,
      email,
      username,
      links,
    });
  },
};

export default ProfileController;
