const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const cors = require("cors");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("DB Connection is successfully established");
//   })
//   .catch(() => {
//     console.log("Error");
//   });

mongoose.connect(
  "mongodb+srv://josephstalin981:44ExXa53icEPI84S@cluster0.1oz6m.mongodb.net/zenstudy?retryWrites=true"
);
// .then(() => {
//   console.log("DB Connection is successfully established");
// })
// .catch(() => {
//   console.log("Error");
// });

app.use(
  cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
