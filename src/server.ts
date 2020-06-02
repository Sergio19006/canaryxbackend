import app from "./app";
let secureEnv = require('secure-env');
process.env = secureEnv({ secret: 'mySecretPassword' });

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("Press CTRL-C to stop process\n");
});

export default server;
