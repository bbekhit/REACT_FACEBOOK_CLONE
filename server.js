const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
