import Joi from 'joi';

import { Product } from '../@types';
import validation from './validation';


export default function validateProduct(data: Product) {

    return validation(Joi.object<Product>({
        title: Joi.string().min(3).max(26).required(),
        description: Joi.string().min(3).max(256).required(),
        currency: Joi.string().min(3).max(3).required(),
        price: Joi.number().required(),
        shipping: Joi.number().required(),
        color: Joi.string().required(),
        condition: Joi.string().required(),
        stock: Joi.number().required()
    }), data);

}

