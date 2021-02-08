"use strict";
exports.__esModule = true;
exports.crud = void 0;
var fs = require("fs");
var crud = /** @class */ (function () {
    function crud(fname, texttowrite) {
        this.fname = fname;
        this.texttowrite = texttowrite;
    }
    crud.prototype.create = function (filename, text) {
        fs.writeFileSync(filename, text);
    };
    crud.prototype.append = function (filename, text) {
        fs.appendFile(filename, text, function (err) {
            console.log(err);
        });
    };
    crud.prototype.renameFile = function (filename, newname) {
        fs.rename(filename, newname, function (err) { console.log(err); });
    };
    crud.prototype.read = function (filename, encoding) {
        if (encoding == 'undefined') {
            encoding = 'utf8';
        }
        fs.readFile(filename, encoding);
    };
    crud.prototype.deleteFile = function (filename) {
        fs.unlink(filename, function (err) {
            console.log(err);
        });
    };
    return crud;
}());
exports.crud = crud;
;
