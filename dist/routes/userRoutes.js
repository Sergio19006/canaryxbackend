"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (req, res) => {
    res.status(200).send("Bienvenido a Canary Experience");
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map