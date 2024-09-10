import Joi from "joi";
import { passwordRegex, phoneRegex } from "../patterns";
import { IName, IUser } from "../../@types";
import { addressSchema, imageSchema } from ".";



export const userUpdateSchema = Joi.object<IUser>({
    email: Joi.string().email(),
    phone: Joi.string().pattern(phoneRegex),
    password: Joi.string().pattern(passwordRegex),
    address: addressSchema,
    name: Joi.object<IName>({
        first: Joi.string().min(2).max(50).required(),
        last: Joi.string().min(2).max(50).required(),
    }),
});

export default userUpdateSchema;

