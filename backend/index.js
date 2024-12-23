const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const cors = require("cors");
const app = express();

app.use(cors());
// const options = [
//   cors({
//     origin: "*",
//     methods: "*",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   }),
// ];

// app.use(options);

app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connection is successfully established");
  })
  .catch(() => {
    console.log("Error");
  });

app.get("/", (req, res) => {
  res.json("Hello World");
});

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// module.exports = app;
