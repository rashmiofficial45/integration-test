"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
require("dotenv/config");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.post("/sum", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    if (a > 1000000 || b > 1000000) {
        return res.status(422).json({
            message: "Sorry we dont support big numbers"
        });
    }
    const result = a + b;
    const request = await db_1.prismaClient.request.create({
        data: {
            a: a,
            b: b,
            answer: result,
            type: "ADD"
        }
    });
    res.json({ answer: result, id: request.id });
});
