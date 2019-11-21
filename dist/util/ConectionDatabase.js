"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.connectDatabase = () => {
    let uri = "mongodb://localhost:27017/CanaryX";
    mongoose_1.default.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose_1.default.set('useCreateIndex', true);
    mongoose_1.default.set("useFindAndModify", false);
};
//# sourceMappingURL=ConectionDatabase.js.map