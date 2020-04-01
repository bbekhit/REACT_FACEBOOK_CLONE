const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

// db;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

//middleware
app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Define Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/post", require("./routes/post"));
app.use("/api/v1/profile", require("./routes/profile"));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
