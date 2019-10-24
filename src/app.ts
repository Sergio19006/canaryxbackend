import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import path from "path";

//const MongoStore = mongo(session);

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

export default app;
