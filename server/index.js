const express = require("express");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");

app.use(cookieParser());

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/videos"));
app.use("/api/subscribe", require("./routes/subscribe"));
app.use("/api/comment", require("./routes/comments"));
app.use("/api/like", require("./routes/like"));

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
