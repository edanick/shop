import { User, Product } from "./models/";
import { users, products } from "./initData";
import bcrypt from "bcrypt";

export async function init() {

    if (await User.countDocuments() == 0) {

        for (let u of users) {
            u.password =  bcrypt.hashSync(u.password, 8);
            let user = await new User(u);
            user.save();
        }
    }

    if (await Product.countDocuments() == 0) {
        for (let p of products) {
            let product = await new Product(p);
            product.save();
        }
    }

    
}