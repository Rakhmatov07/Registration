require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const router = require("./routes/route.register")

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(PORT);
});