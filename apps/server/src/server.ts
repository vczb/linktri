const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Deployed successfully");
});

app.get("/api/ok", (req: any, res: any) => {
  return res.status(200).send({ message: "ok", time: new Date() });
});

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
