"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var route = express_1["default"].Router();
var userController = new user_controller_1.UserController();
route.post("/signup", signupRequest);
route.post("/signin", signinRequest);
route.post("/size", sizeRequest);
route.get("/size/:_id", getUserSize);
route.get("/confirmation/:token", confirmation);
function signupRequest(req, res, next) {
    userController
        .signUp(req.body)
        .then(function () {
        res.send({
            message: "Please check your email for verification..."
        });
    })["catch"](next);
}
function signinRequest(req, res, next) {
    userController
        .signIn(req.body)
        .then(function (token) {
        res.send({
            token: token
        });
    })["catch"](next);
}
function confirmation(req, res, next) {
    userController
        .verifyEmail(req.params.token)
        .then(function () {
        return res.send({
            message: "Email verification done..you can signin now.. "
        });
    })["catch"](next);
}
function sizeRequest(req, res, next) {
    userController
        .updateSize(req.body)
        .then(function () {
        return res.send({
            message: "Size Updated "
        });
    })["catch"](next);
}
function getUserSize(req, res, next) {
    userController
        .getSize(req.params._id)
        .then(function (user) {
        res.send({
            user: user
        });
    })["catch"](next);
}
exports["default"] = route;
