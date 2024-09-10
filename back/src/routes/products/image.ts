import express from 'express';
import fs from 'fs';

import fileUpload from 'express-fileupload';

export const productImageRouter = express.Router();

productImageRouter.use(fileUpload());
productImageRouter.route('/:_id').
    post(async (req: any, res) => {
        const { _id } = req.params,
            { name, data } = req.files.file,
            nameSplit = name.split('.'),
            ext = nameSplit[nameSplit.length - 1];

            fs.writeFileSync(`public/products/${_id}.${ext}`, data);
        console.log(name, data);
    });

export default productImageRouter;