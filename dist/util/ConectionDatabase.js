"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.connectDatabase = () => {
    console.log("");
    let uri = "mongodb+srv://sergio:vkz41ITyig2g1D8v@clustercanaryxperience-mbdzt.mongodb.net/test?retryWrites=true&w=majority";
    mongoose_1.default.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
        console.log(err);
    });
    mongoose_1.default.set('useCreateIndex', true);
    mongoose_1.default.set("useFindAndModify", false);
};
//# sourceMappingURL=ConectionDatabase.js.map