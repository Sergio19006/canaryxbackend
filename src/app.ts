import express, { Response, Request } from "express";
import dotenv from 'dotenv';
import path from "path";
import userRouter from "./routes/userRoutes";
import tripRouter from "./routes/tripRoutes";
import fileUpload from 'express-fileupload';
import cors from 'cors';

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

dotenv.config();

const corsOptions = {
    origin: ['*'],
    allowedHeaders: ['*'],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

app.use((req: Request, res: Response, next: any) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Request-Headers', '*');
    next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/trips', tripRouter);

app.use((error: any, req: Request, res: Response, next: any) => {
    res.status(error.status || 401).send(`Error: ${error.message}`);
});

export default app;
