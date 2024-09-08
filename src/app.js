const express = require("express");

require("./db/mongoose");

const Product = require("./models/product.js");
const Category = require("./models/category.js");

const v1Routes = require("./routes/index.js");

const app = express();

app.use(express.json());

app.use("/api", v1Routes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server listening on port " + port);
});
