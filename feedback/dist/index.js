"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
var c1 = new functions_1.component("Test", "Admin");
c1.createEntity("Title", "Technology");
c1.createEntity("t2", "Technology");
var u1 = new functions_1.component("Tets", "User");
u1.writefeedback("Title", "is This is working");
u1.writefeedback("Title", "is  working");
u1.writefeedback("t2", "This is also working");
u1.writefeedback("t2", "Added");
u1.edityourfeedbacks("Hello there is working????");
c1.viewall();
c1.approveaspecific("is  working");
c1.viewall();
//c1.accessSpecific("Title");
