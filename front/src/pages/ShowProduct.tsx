import { useParams } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';

import useProduct from '../hooks/useProduct';

export default function ShowProduct() {

    const { id } = useParams(),
        { product, error } = useProduct(id!);

    console.log('Error retriving product data', error);

    return (product ?
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <img src={`http://localhost:8080/products/${product.image}`} alt="Company Logo" style={{ width: "100%", height: "auto" }} />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>{product.title}</Typography>
                        <Typography variant="h6" gutterBottom>{product.price} $</Typography>
                        <Typography variant="h6" gutterBottom>{product.shipping} $ shipping</Typography>
                        <Typography variant="body1" paragraph>{product.description}</Typography>
                     
                    </Grid>
                </Grid>
            </Paper>
        </Container> : "Loading"
    );
}