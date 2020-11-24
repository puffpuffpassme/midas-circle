import express from "express";
import { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";
const route: express.Router = express.Router();
const userController: UserController = new UserController();

route.post("/signup", signupRequest);
route.post("/signin", signinRequest);
route.post("/size", sizeRequest);
route.get("/size/:_id", getUserSize);
route.get("/confirmation/:token", confirmation);

function signupRequest(req: Request, res: Response, next: NextFunction) {
  userController
    .signUp(req.body)
    .then(() => {
      res.send({
        message: "Please check your email for verification...",
      });
    })
    .catch(next);
}

function signinRequest(req: Request, res: Response, next: NextFunction) {
  userController
    .signIn(req.body)
    .then((token) => {
      res.send({
        token,
      });
    })
    .catch(next);
}

function confirmation(req: Request, res: Response, next: NextFunction) {
  userController
    .verifyEmail(req.params.token)
    .then(() =>
      res.send({
        message: "Email verification done..you can signin now.. ",
      })
    )
    .catch(next);
}
function sizeRequest(req: Request, res: Response, next: NextFunction) {
  userController
    .updateSize(req.body)
    .then(() =>
      res.send({
        message: "Size Updated ",
      })
    )
    .catch(next);
}
function getUserSize(req: Request, res: Response, next: NextFunction) {
  userController
    .getSize(req.params._id)
    .then((user) => {
      res.send({
        user,
      });
    })
    .catch(next);
}
export default route;
