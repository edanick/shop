import mongoose from "mongoose";
import { productSchema } from "../schemas";
export default mongoose.model("Product", productSchema);