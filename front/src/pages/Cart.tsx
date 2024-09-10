import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Container, Grid } from "@mui/material";

import ProductCard from "../components/ProductCard";

import axios from "axios";

export default function Cart() {

    const { cartProducts, removeFromCart } = useContext(CartContext),
        [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        console.log("change");
        axios.get(`/products?id=${cartProducts.map(p => p._id).join(',')}`).then(({ data }) => {
            setProducts(data);
            console.log(data);
        }).catch((err: any) => { console.log("Error", err); });
    }, [cartProducts]);

    const onRemoveFromCartButtonClick = (_id: string) => {
        removeFromCart(_id);
    }

    const currencies = {
        USD: "$",
        ILS: "₪"
    };

    return (
        <div>
            <Container>
                <Grid container spacing={2}>

                    {products.map((p) => <ProductCard _id={p._id} title={p.title} currencySymbol={currencies["USD"]} price={p.price} onRemoveFromCartButtonClick={onRemoveFromCartButtonClick} shippingPrice={p.shippingPrice} />)}


                </Grid>
            </Container>
        </div>
    );
}