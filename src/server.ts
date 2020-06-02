import app from "./app";

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop process\n");
    console.log("pass:", process.env.ATLAS_PASSWORD);
    console.log("pass2:", process.env.MAIL_PASSWORD);
});

export default server;
