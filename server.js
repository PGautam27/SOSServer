const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
const router = require("./src/routes/routes");
app.use("/", router);

app.listen(3000);
