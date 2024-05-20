import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./routes/userRoutes.js";
import session from "express-session";
import ejs from 'ejs';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
// Set up session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'public'))
app.use(express.static("public"));
app.use("/", UserRoutes);
export default app;