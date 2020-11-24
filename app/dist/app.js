"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
var morgan_1 = require("morgan");
var user_route_1 = require("./routes/user.route");
var passport_1 = require("passport");
var passport_2 = require("./middleware/passport");
var errorHandler_1 = require("./middleware/errorHandler");
var App = /** @class */ (function () {
    function App() {
        this.app = express_1["default"]();
        this.mongoUrl = process.env.MONGOURL;
        this.passport = passport_1["default"];
        this.config();
        this.mongoSetup();
        this.initRoutes();
        this.passportSetup();
    }
    App.prototype.config = function () {
        this.app.use(body_parser_1["default"].json());
        this.app.use(body_parser_1["default"].urlencoded({ extended: false }));
        this.app.use(passport_1["default"].initialize());
        this.app.use(express_1["default"].static("public"));
        this.app.use(morgan_1["default"]("dev"));
        this.app.set("port", process.env.PORT || 8000);
    };
    App.prototype.passportSetup = function () {
        this.app.use(passport_1["default"].initialize());
        this.app.use(passport_1["default"].session());
        this.app.use(express_1["default"].static("public"));
        passport_2.PassportLocal.passportHandler(passport_1["default"]);
    };
    App.prototype.initRoutes = function () {
        this.app.use("/api/user", user_route_1["default"]);
        this.app.use(errorHandler_1.errorHandler);
    };
    App.prototype.mongoSetup = function () {
        mongoose_1["default"].Promise = global.Promise;
        mongoose_1["default"].set("useNewUrlParser", true);
        mongoose_1["default"].set("useFindAndModify", false);
        mongoose_1["default"].set("useCreateIndex", true);
        mongoose_1["default"]
            .connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(function () {
            console.log("Successfully connected to the database");
        })["catch"](function (err) {
            console.log("Could not connect to the database. Exiting now...", err);
            process.exit();
        });
    };
    return App;
}());
exports["default"] = new App().app;
