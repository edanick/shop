import Joi from 'joi';

import validation from './validation';
import { LoginUser } from '../@types';
import { passwordPattern } from './patterns';

export const validateLogin = (data: LoginUser) => validation(Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().pattern(passwordPattern).min(2).max(20).required()
        .messages({
            "string.pattern.base": "the password should be with Capital and small letter, special char and numbers",
            "string.empty": "Enter password"
        })
}), data);



