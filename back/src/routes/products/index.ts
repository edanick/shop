import express from "express";
import mongoose from "mongoose";
import { Product } from "../../db/models";

import { productSchema, productUpdateSchema } from "../../validations/schemas";
import logger from "../../logger";

export const productsRouter = express.Router();


productsRouter.route('/').
    get(async (req: any, res) => {
        const { id, color, min_price, max_price, condition, q, limit } = req.query;
        let filter: any = {};
        if (q) filter.title = new RegExp(q, "ig");
        if (id) filter._id = { $in: id.split(',') }
        if (min_price || max_price) filter.price = {}
        if (min_price) filter.price["$gt"] = parseInt(min_price) - 1;
        if (max_price) filter.price["$lt"] = parseInt(max_price) + 1;
        if (color) filter.color = color;
        if (condition) filter.condition = condition;

        let product = null;

        if (limit) {
            product = await Product.find(filter).limit(limit);
        } else {
            product = await Product.find(filter);
        }

        if (product) {
            logger.success("Code 200 | Product information was retrieved successfully", req);
            res.json(product);
        } else {

            logger.error(`Code (400) | Product doesn't exist`, req);
            res.status(400).json({ success: false, message: "Product doesn't exist" });
        }
    }).
    post(async (req: any, res) => {

        const validation = productSchema.validate(req.body);

        if (validation.error) {

            let errMsg = validation.error.details[0].message;

            logger.error(`Code (400) | Product creation has failed: ${errMsg}`, req);
            res.status(400).json({ success: false, message: errMsg });
        } else {
            let product = new Product({ ...{ _id: new mongoose.Types.ObjectId().toString() }, ...req.body });

            try {

                product = await product.save();

                logger.success(`Code (200) | Product has been created successfully`, req);
                res.json(product);

            } catch (err) {

                let errMsg = err.errorResponse.errmsg;

                logger.error(`Code (400) | Product creation has failed: ${errMsg}`, req);
                res.status(400).json({
                    success: false,
                    message: errMsg
                });
            }

        }

    });


export default productsRouter;