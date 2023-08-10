require("dotenv").config();
const express = require("express");
const app = express();
const {PORT} = process.env;
const {ORIGIN} = process.env;
const cors = require("cors");
const videos = require("./routes/videos")

// app.use(cors({origin: ORIGIN}));
app.use(cors({origin: "*"}));

app.use(express.json());

app.use("/videos", videos);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})