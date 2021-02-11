"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = void 0;
var component = /** @class */ (function () {
    function component(name, role) {
        this.m_name = name;
        this.m_role = role;
    }
    //create Entity[Admin]
    component.prototype.createEntity = function (titlename, category) {
        if (this.m_role === "Admin") {
            var temp = {
                title: titlename,
                category: category,
                feedbacks: []
            };
            component.Entites.push(temp);
        }
    };
    //deleteEntity[Admin]
    component.prototype.deleteEntity = function (titlename) {
        if (this.m_role === "Admin") {
            var todelete = void 0;
            for (var i = 0; i < component.Entites.length; i++) {
                if (component.Entites[i].title == titlename) {
                    component.Entites.splice(i, 1);
                }
                else {
                    console.log('Entity Not Found.');
                }
            }
        }
    };
    //viewAll Entity[Admin]
    component.prototype.viewall = function () {
        if (this.m_role === "Admin") {
            for (var i = 0; i < component.Entites.length; i++) {
                console.log(component.Entites[i]);
            }
        }
    };
    //accessSpecific[Admin]
    component.prototype.accessSpecific = function (titlename) {
        for (var i = 0; i < component.Entites.length; i++) {
            console.log(component.Entites.length);
            if (component.Entites[i].title == titlename) {
                console.log(component.Entites[i]);
            }
        }
    };
    /* USER */
    //Writefeedback
    component.prototype.writefeedback = function (titlename, text) {
        for (var i = 0; i < component.Entites.length; i++) {
            console.log('Here');
            if (component.Entites[i].title == titlename) {
                component.Entites[i].feedbacks.push(text);
            }
        }
    };
    component.Entites = [];
    return component;
}());
exports.component = component;
