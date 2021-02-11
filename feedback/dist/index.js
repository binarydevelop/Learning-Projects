"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
var c1 = new functions_1.component("Test", "Admin");
c1.createEntity("Title", "Person");
c1.createEntity("Title", "Technology");
c1.createEntity("Title", "Technology");
c1.viewall();
