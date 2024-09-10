import Joi from "joi";
import { passwordRegex, phoneRegex } from "../patterns";
import { IName, IUser } from "../../@types";
import { addressSchema, imageSchema } from ".";



export const userSchema = Joi.object<IUser>({
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
  address: addressSchema.required(),
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(50).required(),
    last: Joi.string().min(2).max(50).required(),
  }).required(),
});

export default userSchema;

