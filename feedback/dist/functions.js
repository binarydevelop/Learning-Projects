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
                feedbacks: [],
            };
            component.Entites.push(temp);
        }
        else {
            throw ('Error Occured. Make sure you are an Admin.');
        }
    };
    //deleteEntity[Admin]
    component.prototype.deleteEntity = function (titlename) {
        if (this.m_role === "Admin") {
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
                console.log(((component.Entites[i].feedbacks.length) / 2) - 1 + " feedbacks are there.");
            }
        }
        else {
            throw ('Sorry You need to be an Admin.');
        }
    };
    //accessSpecific[Admin]
    component.prototype.accessSpecificEntity = function (titlename) {
        for (var i = 0; i < component.Entites.length; i++) {
            if (component.Entites[i].title == titlename) {
                console.log(component.Entites[i]);
            }
        }
    };
    //Approve a Feedback[Admin]
    component.prototype.approveaspecific = function (titlename) {
        for (var i = 0; i < component.Entites.length; i++) {
            for (var j = 0; j < component.Entites[i].feedbacks.length; j++) {
                if (component.Entites[i].feedbacks[j] == titlename) {
                    component.Entites[i].feedbacks[j + 2] = "Approved";
                }
            }
        }
    };
    //remove feedback
    /* USER */
    //Writefeedback with username
    component.prototype.writefeedback = function (titlename, text, status) {
        if (status === void 0) { status = "Not Approved"; }
        for (var i = 0; i < component.Entites.length; i++) {
            if (component.Entites[i].title == titlename) {
                var username = this.m_name;
                component.Entites[i].feedbacks.push(text, username, status);
            }
        }
    };
    //view self feedbacks
    component.prototype.viewyourfeedbacks = function () {
        for (var i = 0; i < component.Entites.length; i++) {
            for (var j = 0; j < component.Entites[i].feedbacks.length; j++) {
                if (component.Entites[i].feedbacks[j] == this.m_name) {
                    console.log(component.Entites[i].feedbacks[j - 1].toUpperCase());
                }
            }
        }
    };
    component.prototype.edityourfeedbacks = function (texttoappend) {
        for (var i = 0; i < component.Entites.length; i++) {
            for (var j = 0; j < component.Entites[i].feedbacks.length; j++) {
                if (component.Entites[i].feedbacks[j] == this.m_name) {
                    component.Entites[i].feedbacks[j - 1] += texttoappend;
                    break;
                }
            }
            break;
        }
    };
    component.Entites = [];
    return component;
}());
exports.component = component;
