import express from "express";
import mongoose from "mongoose";
import { Product } from "../../db/models";
import fs from 'fs';

import { productSchema, productUpdateSchema } from "../../validations/schemas";
import logger from "../../logger";

export const productRouter = express.Router();


productRouter.route('/:_id').
    put(async (req: any, res) => {

        const validation = productUpdateSchema.validate(req.body);

        if (validation.error) {


            let errMsg = validation.error.details[0].message;

            logger.error(`Code (400) | Product update has failed: ${errMsg}`, req);
            res.status(400).json({ success: false, message: errMsg });

        } else {


            let product = await Product.findByIdAndUpdate(req.params._id, req.body);


            if (product) {
                product = await Product.findById(req.params._id);

                logger.success("Code 200 | Product information was updated successfully", req);
                res.json(product);
            } else {
                logger.error("Code 400 | Product doesn't exist", req);
                res.status(400).json({
                    success: false,
                    message: "Product doesn't exist"
                });
            }

        }
    }).
    delete(async (req: any, res) => {
        let { _id } = req.params;

        try {

            let product = await Product.findByIdAndDelete(_id);

            if (product) {

                let filePath = `public/products/${product.image}`;

                if (fs.existsSync(filePath)) { fs.unlinkSync(filePath); }

                logger.success("Code 200 | Product has been deleted successfully", req);
                res.json(product);
            } else {
                logger.error("Code 400 | Product doesn't exist", req);
                res.status(400).json({
                    success: false,
                    message: "Product doesn't exist"
                });
            }


        } catch (err) { }

    });


export default productRouter;