import UserModel from "../models/user.model";
import { Helper } from "../helper/helper";
import jwt from "jsonwebtoken";

export class UserController {
  public async signUp(params: any) {
    const token = await jwt.sign(params, process.env.ACTIVATIONKEY || "", {
      expiresIn: "20m",
    });
    var emailexist = await UserModel.findOne({ email: params.email });
    if (emailexist) {
      throw "Email address already exists";
    }
    await this.sendVerificationEmail(params, token);
  }
  public async signIn(params: any) {
    var data: any = await UserModel.findOne({ email: params.email });
    if (!data) {
      throw "Email address doesnot exists";
    }
    var user: any = await Helper.compareEncHash(params.password, data.password);
    if (!user) {
      throw "Incorrect password";
    }
    const token = await jwt.sign(
      data.toJSON(),
      process.env.ACTIVATIONKEY || ""
    );
    return token;
  }

  public async verifyEmail(token: string) {
    var decodedtoken = await jwt.verify(token, process.env.ACTIVATIONKEY || "");
    if (decodedtoken) {
      const userModel = new UserModel(decodedtoken);
      await userModel.save();
    }
  }
  public async sendVerificationEmail(params: any, token: any) {
    await Helper.sendEmail(params, token);
  }
}
