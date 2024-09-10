import { useEffect, useMemo, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid } from '@mui/material';

import { AuthContext } from '../contexts/AuthContext';
import { Product } from '../@types';
import ProductCard from '../components/ProductCard';

import { CartContext } from '../contexts/CartContext';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]),
    { addToCart, removeFromCart } = useContext(CartContext),
        navigate = useNavigate(),

        user = useContext(AuthContext);

    useEffect(() => {
        axios.get('/products?limit=3').then(({ data }) => {
            setProducts(data);
        }).catch((err) => { console.log("Error", err); });
    }, []);

    const onAddToCartButtonClick = (_id: string) => addToCart(_id),
        onRemoveFromCartButtonClick = (_id: string) => removeFromCart(_id),
        onDeleteButtonClick = (_id: string) => {
            try {
                axios.delete(`/products/${_id}`);
            } catch (err) {
                console.log(err);
            }
            setProducts((data) => data.filter((p) => p._id != _id));
        };

    const currencies = {
        USD: "$",
        ILS: "₪"
    };


    return (
        <Container>
            <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/32/16/07/360_F_232160763_FuTBWDd981tvYEJFXpFZtolm8l4ct0Nz.jpg")', backgroundSize: 'cover', minHeight: '240px', color: 'black', marginBottom: '10px' }}>
                <h1>Shop</h1>
                <h4>Shop for the most trending products</h4>
            </div>
            <Grid container spacing={2} sx={{ justifyContent: 'space-evenly' }} >
                {products.map((p) =>
                    <Grid item key={p._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard _id={p._id!} title={p.title} currencySymbol={currencies["USD"]} price={p.price} image={`http://localhost:8080/products/${p.image}`}
                            shippingPrice={p.shipping} onAddToCartButtonClick={onAddToCartButtonClick} onRemoveFromCartButtonClick={onRemoveFromCartButtonClick}
                            onDeleteButtonClick={onDeleteButtonClick}
                        />
                    </Grid>)}
            </Grid>
        </Container>
    );
}