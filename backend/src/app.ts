import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";

import userRouter from "./routes/users";
import noteRouter from "./routes/notes";

const app: Application = express();
const port: number = Number(process.env.port) || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

const uri: string = process.env.ATLAS_URI || "No uri found";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection: Connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected");
});

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
