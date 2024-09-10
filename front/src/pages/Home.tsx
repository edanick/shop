import { useEffect, useMemo, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid } from '@mui/material';

import { AuthContext } from '../contexts/AuthContext';
import { Product } from '../@types';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]),
        navigate = useNavigate(),
        user = useContext(AuthContext);

    useEffect(() => {
        axios.get('/products?limit=3').then(({ data }) => {
            setProducts(data);
        }).catch((err) => { console.log("Error", err); });
    }, []);

    const currencies = {
        USD: "$",
        ILS: "₪"
    };


    return (
        <Container>
            <div>
                <h1>Shop</h1>
                <h4>Shop for the most trending products</h4>
            </div>
            <Grid container spacing={2}>
                {products.map((p) =>
                    <Grid item key={p._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard _id={p._id!} title={p.title} currencySymbol={currencies["USD"]} price={p.price} image={`http://localhost:8080/products/${p._id}.webp`}
                            shippingPrice={p.shipping} />
                    </Grid>)}
            </Grid>
        </Container>
    );
}