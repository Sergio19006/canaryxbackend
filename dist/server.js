"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const secureEnv = require('secure-env');
const options = {
    key: fs_1.default.readFileSync('key.pem'),
    cert: fs_1.default.readFileSync('cert.pem')
};
process.env = secureEnv({ secret: 'mySecretPassword' });
/**
 * Start Express server.
 */
/*const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("Press CTRL-C to stop process\n");
});*/
//http.createServer(app).listen(3000);
console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
https_1.default.createServer(options, app_1.default).listen(3000);
//# sourceMappingURL=server.js.map