"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tripRoutes_1 = __importDefault(require("./routes/tripRoutes"));
const cors_1 = __importDefault(require("cors"));
// Create Express server
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
const corsOptions = {
    origin: ['http://localhost:8080'],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/trips', tripRoutes_1.default);
app.use((error, req, res, next) => {
    console.log("Estee es el error", error.status);
    res.status(error.status).send("Error");
});
exports.default = app;
//# sourceMappingURL=app.js.map