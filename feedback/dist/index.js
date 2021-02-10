"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
var c1 = new functions_1.component("Test", "Admin");
c1.createEntity("Title", "Person");
console.log(c1.Entites[0]);
