"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = void 0;
var class_validator_1 = require("class-validator");
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
                console.table(component.Entites[i]);
                console.table(((component.Entites[i].feedbacks.length) / 2) - 1 + " feedbacks are there.");
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
    component.prototype.removefeedback = function (titlename) {
        if (this.m_role == "Admin") {
            for (var i = 0; i < component.Entites.length; i++) {
                console.log('hy');
                for (var j = 0; j < component.Entites[i].feedbacks.length; j++) {
                    if (component.Entites[i].feedbacks[j] === titlename) {
                        console.log('true');
                        component.Entites[i].feedbacks.splice(j, 3);
                    }
                }
            }
        }
        else {
            throw ('You are not an adminstrator');
        }
    };
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
                    console.log(component.Entites[i].feedbacks[j - 1].toUpperCase() + " | Status : " +
                        component.Entites[i].feedbacks[j + 1]);
                }
            }
        }
    };
    //edit your feedbacks
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
    /* SORTING AND FILTERING[ADMIN & USER] */
    //sorting??
    component.prototype.filterby = function (categoryname) {
        for (var i = 0; i < component.Entites.length; i++) {
            if (component.Entites[i].category == categoryname) {
                console.log(component.Entites[i]);
            }
        }
    };
    component.Entites = [];
    __decorate([
        class_validator_1.MinLength(3, {
            message: 'Your $value is too short'
        }),
        class_validator_1.MaxLength(10, {
            message: '$value getting long.'
        })
    ], component.prototype, "m_name", void 0);
    __decorate([
        class_validator_1.Length(4, 5)
    ], component.prototype, "m_role", void 0);
    return component;
}());
exports.component = component;
