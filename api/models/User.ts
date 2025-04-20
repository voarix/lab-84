import mongoose, { HydratedDocument, Model } from "mongoose";
import { UserFields } from "../types";
import { randomUUID } from "node:crypto";
import argon2 from "argon2";

interface UserMethods {
  checkPassword: (password: string) => Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const UserSchema = new mongoose.Schema<
  HydratedDocument<UserFields>,
  UserModel,
  UserMethods,
  {}
>({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
    required: [true, "Token is required"],
  }
});

UserSchema.methods.checkPassword = async function (password: string) {
  return await argon2.verify(this.password, password);
}

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
}

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();


  this.password = await argon2.hash(this.password);
  next();
});

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model("User", UserSchema);
export default User;

