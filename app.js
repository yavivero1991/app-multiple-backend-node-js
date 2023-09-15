require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./app/config/mongo");

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;
app.use("/api", require("./app/routes"));

app.listen(port, () =>
    console.log(`App listens to http://localhost:${port}`)
);

dbConnectNoSql();
