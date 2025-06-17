"use strict";
//=============== Hello World ===============
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const name1 = (param: string)=> `Olá ${param} como você vai?`
// console.log(name1("Hello World"))
//=============== Calculadora ===============
// const numberOne: number = 10
// const numberTwo: number = 7
// const sum = (numberOne: number, numberTwo: number) => numberOne + numberTwo
// const subtrain = (numberOne: number, numberTwo: number) => numberOne - numberTwo
// const divide = (numberOne: number, numberTwo: number) => numberOne / numberTwo
// const multiply = (numberOne: number, numberTwo: number) => numberOne * numberTwo
// console.log(sum(numberOne, numberTwo))
// console.log(subtrain(numberOne, numberTwo))
// console.log(divide(numberOne, numberTwo))   
// console.log(multiply(numberOne, numberTwo))
// ================ Desafio ============
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
// import { stringify } from "querystring"
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Filtro de Users ON");
});
app.get("/users", (req, res) => {
    try {
        if (!fs_1.default.existsSync("users.json")) {
            throw new Error("Arquivo não encontrado");
        }
        const fileContent = fs_1.default.readFileSync("users.json", "utf8");
        res.send(fileContent);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.get("/users/name", (req, res) => {
    try {
        if (!fs_1.default.existsSync("users.json")) {
            throw new Error("Arquivo não foi encontrado!");
        }
        const usersJsonString = fs_1.default.readFileSync("users.json", "utf8");
        const usersData = JSON.parse(usersJsonString);
        const usersNameList = [];
        for (let users in usersData) {
            usersNameList.push(usersData[users].nome);
        }
        res.send(usersNameList);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
