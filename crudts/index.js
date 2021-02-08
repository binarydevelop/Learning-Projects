"use strict";
exports.__esModule = true;
var express = require("express");
// Importing the class from the location of the file 
var functions_1 = require("./functions");
var func_use = new functions_1.crud('TEST.txt', "Hello World");
func_use.create("test.txt", "Hello World");
var app = express();
app.get('/', function (req, res) {
    res.send("Hello World");
});
app.listen('3000');
