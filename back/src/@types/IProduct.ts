import { ObjectId } from "mongoose"
export type IProduct = {
    _id: ObjectId,
    title: string,
    image?: string,
    description: string,
    currency: string,
    price: number,
    shipping: number,
    color: string,
    condition: string,
    stock: number
}