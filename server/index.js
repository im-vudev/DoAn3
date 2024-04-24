import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
const app = express();
const apiPort = 5000;
const connectionString = 'mongodb://mongo:27017/tracking';
const connectionStringAtlas = 'mongodb+srv://hxuan190:QJqXWKF2laa1n66T@cluster0.fpd2c6b.mongodb.net/?retryWrites=true&w=majority';
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});

app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

mongoose
  .connect(connectionStringAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
  )
  .catch((error) => console.log("Mongo Error", error.message));
