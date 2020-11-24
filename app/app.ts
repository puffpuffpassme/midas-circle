import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";
import user from "./routes/user.route";
import passport from "passport";
import { PassportLocal } from "./middleware/passport";
import { errorHandler } from "./middleware/errorHandler";

class App {
  public app: express.Application = express();
  public mongoUrl: any = process.env.MONGOURL;
  public passport: any = passport;

  constructor() {
    this.config();
    this.mongoSetup();
    this.initRoutes();
    this.passportSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(passport.initialize());
    this.app.use(express.static("public"));
    this.app.use(logger("dev"));
    this.app.set("port", process.env.PORT || 8000);
  }
  private passportSetup(): void {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.static("public"));
    PassportLocal.passportHandler(passport);
  }

  private initRoutes(): void {
    this.app.use("/api/user", user);
    this.app.use(errorHandler);
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });
  }
}

export default new App().app;
