import express from "express";
import { config } from "dotenv";
import { initiateApp } from "./utils/intiateApp.js";
const app = express();
config()
initiateApp(app, express);
