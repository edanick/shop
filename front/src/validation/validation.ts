import Joi, { ValidationErrorItem } from 'joi';
import { LoginUser, Product, RegisterUser2D } from '../@types';

export default function validation(schema: Joi.Schema, data: RegisterUser2D | LoginUser | Product | any) {
    const { error } = schema.validate(data, { abortEarly: false });

    return error ? Object.fromEntries(new Map(error.details.map((i: ValidationErrorItem) =>
        [i.path[i.path.length - 1], i.message])).entries()) : null;

}