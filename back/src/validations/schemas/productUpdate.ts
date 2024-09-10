import Joi from "joi";
import { IProduct } from "../../@types";

export const productUpdateSchema = Joi.object<IProduct>({
    title: Joi.string().min(3).max(26),
    description: Joi.string().min(3).max(256),
    currency: Joi.string().min(3).max(3),
    price: Joi.number(),
    shipping: Joi.number(),
    color: Joi.string(),
    condition: Joi.string(),
    stock: Joi.number()
});

export default productUpdateSchema;