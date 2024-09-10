import { Types, Schema } from "mongoose";
import { IProduct } from "../../@types";

export default new Schema<IProduct>({
    _id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true, minlength: 2, maxlength: 128 },
    image: { type: String, required: false,  maxlength: 128 },
    description: { type: String, required: false, maxlength: 256 },
    currency: { type: String, required: true, minlength: 3, maxlength: 3 },
    price: { type: Number, required: true },
    shipping: { type: Number, required: true },
    color: { type: String, required: true },
    condition: { type: String, required: true, maxlength: 12 },
    stock: { type: Number, required: true }
});