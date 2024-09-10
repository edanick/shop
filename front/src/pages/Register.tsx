import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Alert, Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

import Routes from '../routes/Routes';
import mutateData from '../utils/mutateRegisterUser';
import validateRegister from '../validation/registerValidation';
import { RegisterUser2D } from "../@types";



export default function Register() {
    const navigate = useNavigate(),
        [errorsState, setErrorsState] = useState<any>(null),
        [inputsValue, setInputsValue] = useState<RegisterUser2D>({
            first: '',
            last: '',
            email: '',
            password: '',
            phone: '',
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: null!,
        }),

        onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
            setInputsValue((state: any) => ({ ...state, [e.target.id]: e.target.value, })),

        onCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
            setInputsValue((state: any) =>
                ({ ...state, [e.target.id]: e.target.checked, })),

        onSubmitButtonClick = async (e: React.ChangeEvent<HTMLFormElement>) => {
            try {
                e.preventDefault();
                const errors = validateRegister(inputsValue);
                setErrorsState(errors);
                console.log(errors);
                if (errors) return;
                let request = mutateData(inputsValue);
                const { data } = await axios.post("/users", request);
                console.log("data", data);

                toast("You registered successfully 👌", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate(Routes.Home);

            } catch (err: any) {
                toast.error(err.response.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                console.log(err);
            }
        };

    return (
        <Box sx={{
            marginTop: 8, display: "flex",
            flexDirection: "column", alignItems: "center"
        }} >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}><LockOutlinedIcon /></Avatar>
            <Typography component="h1" variant="h5">Register</Typography>

            <Box component="form" noValidate onSubmit={onSubmitButtonClick} sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>

                        <TextField autoComplete="given-name" name="first" required fullWidth
                            id="first" label="First Name" autoFocus value={inputsValue.first}
                            onChange={onInputChange} />
                        {errorsState?.first &&
                            <Alert severity="warning">{errorsState.first}</Alert>}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField required fullWidth id="last" label="Last Name" name="last"
                            autoComplete="family-name" value={inputsValue.last}
                            onChange={onInputChange} />
                        {errorsState?.last &&
                            <Alert severity="warning">{errorsState.last}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth id="email" label="Email Address" name="email"
                            autoComplete="email" value={inputsValue.email} onChange={onInputChange} />
                        {errorsState?.email &&
                            <Alert severity="warning">{errorsState.email}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth name="password" label="Password" type="password"
                            id="password" autoComplete="new-password" value={inputsValue.password}
                            onChange={onInputChange} />
                        {errorsState?.password &&
                            <Alert severity="warning">{errorsState.password}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth name="phone" label="Phone" id="phone"
                            autoComplete="new-phone" value={inputsValue.phone} onChange={onInputChange}
                        />
                        {errorsState?.phone &&
                            <Alert severity="warning">{errorsState.phone}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth name="state" label="State" id="state"
                            autoComplete="new-state" value={inputsValue.state} onChange={onInputChange}
                        />
                         {errorsState?.state &&
                            <Alert severity="warning">{errorsState.state}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth name="country" label="Country" id="country"
                            autoComplete="new-country" value={inputsValue.country}
                            onChange={onInputChange} />
                        {errorsState?.country &&
                            <Alert severity="warning">{errorsState.country}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth name="city" label="City" id="city"
                            autoComplete="new-city" value={inputsValue.city} onChange={onInputChange}
                        />
                        {errorsState?.city &&
                            <Alert severity="warning">{errorsState.city}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth name="street" label="Street" id="street"
                            autoComplete="new-street" value={inputsValue.street}
                            onChange={onInputChange} />
                        {errorsState?.street &&
                            <Alert severity="warning">{errorsState.street}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth name="houseNumber" label="House Number"
                            id="houseNumber" autoComplete="new-houseNumber" value={inputsValue.houseNumber}
                            onChange={onInputChange} />
                        {errorsState?.houseNumber &&
                            <Alert severity="warning">{errorsState.houseNumber}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth name="zip" label="Zip" id="zip" autoComplete="new-zip"
                            value={inputsValue.zip} onChange={onInputChange} />
                        {errorsState?.zip &&
                            <Alert severity="warning">{errorsState.zip}</Alert>}
                    </Grid>

                </Grid>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Register
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">Already have an account? Login</Link>
                    </Grid>
                </Grid>

            </Box>

        </Box>
    );
};
