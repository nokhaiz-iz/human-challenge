"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jsonwebtoken_1 = require("jsonwebtoken");
require("reflect-metadata");
var data_source_1 = require("./data-source");
//create jwt authentication
var createToken = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var token, userVerify;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, jsonwebtoken_1.jwt.sign(body, "secrethaiufhbaywegfbwefgwebbcwuicbce", {
                    expiresIn: "1h",
                })];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, jsonwebtoken_1.jwt.verify(token, "secrethaiufhbaywegfbwefgwebbcwuicbce")];
            case 2:
                userVerify = _a.sent();
                return [2 /*return*/, token];
        }
    });
}); };
// create typeorm connection
data_source_1.AppDataSource.initialize().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = express();
        app.use(express.json());
        // console.log("Inserting a new user into the database...");
        // const user = new User();
        // user.username = "Timber";
        // user.password = "Saw";
        // await AppDataSource.manager.save(user);
        // console.log("Saved a new user with id: " + user.id);
        // register routes
        app.post("/login", createToken, function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var body, signBody;
                return __generator(this, function (_a) {
                    body = req.body;
                    signBody = createToken(body);
                    res.status(200).send(signBody);
                    return [2 /*return*/];
                });
            });
        });
        app.all("*", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var fullUrl;
                return __generator(this, function (_a) {
                    fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
                    return [2 /*return*/, res.status(404).send(fullUrl)];
                });
            });
        });
        // start express server
        app.listen(3000);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=app.js.map