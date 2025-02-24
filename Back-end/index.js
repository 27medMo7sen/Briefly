import express from "express";
import { config } from "dotenv";
import { initiateApp } from "./utils/intiateApp.js";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
config();
initiateApp(app, express);
