"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = void 0;
var component = /** @class */ (function () {
    function component(name, role) {
        this.Entites = [];
        this.m_name = name;
        this.m_role = role;
    }
    //create Entity
    component.prototype.createEntity = function (title, catgory) {
        if (this.m_role == "Admin") {
            var obj = { "title": title,
                "category": catgory };
            this.Entites.push(obj);
        }
        else {
            console.log("You need to be an Admin to create Entity.");
        }
    };
    //Delete Entity
    component.prototype.delteEntity = function (title) {
        if (this.m_role == "Admin") {
            var to_delete = this.Entites.indexOf({ title: "Title" }, 0);
            this.Entites.splice(to_delete, 1);
        }
    };
    return component;
}());
exports.component = component;
