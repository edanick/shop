import express from "express";
import mongoose from "mongoose";
import { Product } from "../../db/models";

import { productSchema, productUpdateSchema } from "../../validations/schemas";
import logger from "../../logger";

export const productsRouter = express.Router();


productsRouter.route('/').
    get(async (req: any, res) => {
        const { id, color, min_price, max_price, condition, q } = req.query;
        let filter: any = {};
        if (q) filter.title = new RegExp(q, "ig");
        if (id) filter._id = { $in: id.split(',') }
        if (min_price || max_price) filter.price = {}
        if (min_price) filter.price["$gt"] = parseInt(min_price) - 1;
        if (max_price) filter.price["$lt"] = parseInt(max_price) + 1;
        if (color) filter.color = color;
        if (condition) filter.condition = condition;

        let product = await Product.find(filter)

        if (product) {
            logger.success("Code 200 | Product information was retrieved successfully", req);
            res.json(product);
        } else {
            
            logger.error(`Code (400) | Product doesn't exist`, req);
            res.status(400).json({ success: false, message: "Product doesn't exist" });
        }
    });
  

export default productsRouter;