"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var route = express_1["default"].Router();
var userController = new user_controller_1.UserController();
route.post("/signup", signupRequest);
route.post("/signin", signinRequest);
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
exports["default"] = route;
