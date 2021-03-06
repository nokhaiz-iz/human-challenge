"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var zod_1 = require("zod");
var validate = function (schema) {
    return function (req, res, next) {
        try {
            schema.parse({
                params: req.params,
                query: req.query,
                body: req.body,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    status: "fail",
                    errors: error.errors,
                });
            }
            next(error);
        }
    };
};
exports.validate = validate;
