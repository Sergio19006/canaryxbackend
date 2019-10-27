import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import userRouter from "./routes/userRoutes";
import cors from 'cors';

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

const corsOptions = {
    origin: ['http://localhost:8080'],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}

app.use(cors(corsOptions));

app.use('/api/users', userRouter);

export default app;
