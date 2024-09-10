import express from 'express';
import fs from 'fs';

import fileUpload from 'express-fileupload';

export const productImageRouter = express.Router();
import { Product } from '../../db/models';

import logger from '../../logger';

productImageRouter.use(fileUpload());
productImageRouter.route('/:_id').
    post(async (req: any, res) => {
        const { _id } = req.params,
            { name, data } = req.files.file,
            nameSplit = name.split('.'),
            ext = nameSplit[nameSplit.length - 1];

        fs.writeFileSync(`public/products/${_id}.${ext}`, data);

        let product = await Product.findByIdAndUpdate(_id, { image: `${_id}.${ext}` });

        if (product) {
            
            logger.success(`Code (200) | Product image was uploaded successfully`, req);
            res.json({
                success: true,
                message: 'Product image was uploaded successfully'
            });

        }
        console.log(name, data);
    });

export default productImageRouter;