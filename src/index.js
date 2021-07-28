require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send(200);
});
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(PORT);
  console.log(`Example app listening at http://localhost:${PORT}`);
});
