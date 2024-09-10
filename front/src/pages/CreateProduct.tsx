import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Alert, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, SelectChangeEvent } from '@mui/material'

import Routes from '../routes/Routes';
import { Product } from '../@types';
import validateProduct from "../validation/productValidation";

const initialState = {
    title: '',
    description: '',
    currency: 'USD',
    price: 0,
    shipping: 0,
    condition: null!,
    color: null!,
    stock: 0
}

export default function CreateProduct() {
    const [formData, setFormData] = useState<Product>(initialState),

        { title, description, currency, price, shipping, condition, color, stock } = formData,
        [errorsState, setErrorsState] = useState<any>(null);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((formData: Product) => ({ ...formData, [e.target.id]: e.target.value }));
    },
        selectOnChange = (e: SelectChangeEvent) => {
            setFormData((formData: Product) => ({ ...formData, [e.target.name]: e.target.value }));
        }
    const onCreateButtonClick = async () => {

        try {


            const errors = validateProduct(formData);
            setErrorsState(errors);
            console.log(errors);

            if (errors) return;

            alert(formData);
            await axios.post("/products", formData);

            toast("Your product was created 👌", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (err: any) {

            console.log("err", err.response);
        }
    };


    return (
        <Container sx={{ padding: "50px" }}>
            <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
                Product - Create
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
                Put a new values in the correct input
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container flexDirection={"column"}>
                <TextField id="title" label="Title" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={title} required />
                {errorsState?.title &&
                    <Alert severity="warning">{errorsState.title}</Alert>}

                <TextField id="description" label="Description" variant="outlined" required
                    sx={{ mt: "10px" }} onChange={onInputChange} value={description} />
                {errorsState?.description &&
                    <Alert severity="warning">{errorsState.description}</Alert>}

                <TextField id="price" label="Price" variant="outlined"
                    sx={{ mt: "10px" }} onChange={onInputChange} value={price} required />
                {errorsState?.price &&
                    <Alert severity="warning">{errorsState.price}</Alert>}

                <TextField id="shipping" label="Shipping Price" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={shipping} />
                {errorsState?.shipping &&
                    <Alert severity="warning">{errorsState.shipping}</Alert>}


                <TextField id="stock" label="Stock" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={stock} />
                {errorsState?.stock &&

                    <Alert severity="warning">{errorsState.stock}</Alert>}

                <br />

                <FormControl fullWidth>
                    <InputLabel id="condition-label">Condition</InputLabel>
                    <Select labelId="condition-label" label="Condition" name="condition" onChange={selectOnChange} value={condition}>
                        <MenuItem value={"New"}>New</MenuItem>
                        <MenuItem value={"Used"}>Used</MenuItem>
                    </Select>
                </FormControl>

                {errorsState?.condition &&

                    <Alert severity="warning">{errorsState.condition}</Alert>}

                <br />

                <FormControl fullWidth>
                    <InputLabel id="color-label">Color</InputLabel>
                    <Select labelId="color-label" label="Color" name="color" onChange={selectOnChange} value={color} >
                        <MenuItem value={"Black"}>Black</MenuItem>
                        <MenuItem value={"Gray"}>Gray</MenuItem>
                        <MenuItem value={"Red"}>Red</MenuItem>
                        <MenuItem value={"Transparent"}>Transparent</MenuItem>
                        <MenuItem value={"White"}>White</MenuItem>
                        <MenuItem value={"White"}>Yellow</MenuItem>
                    </Select>
                </FormControl>

                {errorsState?.color &&

                    <Alert severity="warning">{errorsState.color}</Alert>}

            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={8} xs>
                    <Button variant="outlined" onClick={onCreateButtonClick}
                        sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }} >
                        Submit
                    </Button>
                </Grid>
                <Grid item xs>
                    <Link to={Routes.Home}>
                        <Button variant="outlined"
                            sx={{
                                mt: 2, width: "100%", ml: "0%",
                                bgcolor: "navy", color: "gray"
                            }}>
                            Discard
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

