import Links from "../models/LinksModel";

const LinksController = {
  create: async (req, res) => {
    const { name, url, icon, userId } = req.body;

    const link = await Links.create({
      user: userId,
      name,
      url,
      icon,
    });

    if (!link) {
      return res.status(500).send({ message: "Fail to create a link." });
    }

    res.status(200).send({
      message: "Link was created successfully!",
      link,
    });
  },
  delete: async (req, res) => {
    const { id } = req.body;

    await Links.findByIdAndDelete(id).exec((err: Error, link) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        message: "Link was deleted successfully!",
      });
    });
  },
  edit: async (req, res) => {
    const { id, name, url, icon, userId } = req.body;

    await Links.findByIdAndUpdate(id, {
      name,
      url,
      icon,
    }).exec((err: Error, link) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        message: "Link was edited successfully!",
      });
    });
  },
};

export default LinksController;
