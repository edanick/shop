import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Alert, Button, Box, Checkbox, Grid, FormControlLabel, TextField, Typography } from '@mui/material';
import axios from "axios";

import { normalizeUpdatedData } from '../utils/normalizeUpdatedData';
import Routes from '../routes/Routes';
import useUser from '../hooks/useUser';
import validateUpdateUser from "../validation/updateUserValidaiton";

export default function UpdateUser() {
    const navigate = useNavigate(),
        { id } = useParams(),
        { user } = useUser(id!),
        [errorsState, setErrorsState] = useState<any>(null),
        [inputsValue, setInputsValue] = useState<any>({
            first: "",
            last: "",
            email: "",
            password: "",
            phone: "",
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: "",
            zip: "",
        }),



        handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputsValue((currentState: any) => ({
                ...currentState,
                [e.target.id]: e.target.value,
            }));
        },

        handleInputsChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputsValue((currentState: any) => ({
                ...currentState,
                [e.target.id]: e.target.checked,
            }));
        },
        handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            try {
                e.preventDefault();

                const errors = validateUpdateUser(inputsValue);
                setErrorsState(errors);
                console.log(errors);
                if (errors) return;
                let request = normalizeUpdatedData(inputsValue);
                const { data } = await axios.put(`/users/${id}`, request);
                console.log("data", data);

                toast("User Updated successfully 👌", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate(Routes.AdminPanel);

            } catch (err) {
                console.log(err);
            }
        };


    useEffect(() => {


        setInputsValue({
            first: user?.name.first!,
            last: user?.name.last!,
            phone: user?.phone!,
            state: user?.address.state!,
            country: user?.address.country!,
            city: user?.address.city!,
            street: user?.address.street!,
            houseNumber: user?.address.houseNumber!,
            zip: user?.address.zip!,
        });

    }, [user]);


    return (
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5"> Update User </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField autoComplete="given-name" name="first" required fullWidth id="first" label="First Name"
                            autoFocus value={inputsValue.first} onChange={handleInputsChange} />
                        {errorsState?.first &&
                            <Alert severity="warning">{errorsState.first}</Alert>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField required fullWidth id="last" label="Last Name" name="last" autoComplete="family-name"
                            value={inputsValue.last} onChange={handleInputsChange} />
                        {errorsState?.last &&
                            <Alert severity="warning">{errorsState.last}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth name="phone" label="Phone" id="phone" autoComplete="new-phone"
                            value={inputsValue.phone} onChange={handleInputsChange} />
                        {errorsState?.phone &&
                            <Alert severity="warning">{errorsState.phone}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name="url" label="Url" id="url" autoComplete="new-url" value={inputsValue.url}
                            onChange={handleInputsChange} />
                        {errorsState?.url &&
                            <Alert severity="warning">{errorsState.url}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name="alt" label="Alt" id="alt" autoComplete="new-alt" value={inputsValue.alt}
                            onChange={handleInputsChange} />
                        {errorsState?.alt &&
                            <Alert severity="warning">{errorsState.alt}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name="state" label="State" id="state" autoComplete="new-state"
                            value={inputsValue.state} onChange={handleInputsChange} />
                        {errorsState?.state &&
                            <Alert severity="warning">{errorsState.state}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth name="country" label="Country" id="country"
                            autoComplete="new-country" value={inputsValue.country} onChange={handleInputsChange} />
                        {errorsState?.country &&
                            <Alert severity="warning">{errorsState.country}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth name="city" label="City" id="city" autoComplete="new-city"
                            value={inputsValue.city} onChange={handleInputsChange} />
                        {errorsState?.city &&
                            <Alert severity="warning">{errorsState.city}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth name="street" label="Street" id="street"
                            autoComplete="new-street" value={inputsValue.street} onChange={handleInputsChange} />
                        {errorsState?.street &&
                            <Alert severity="warning">{errorsState.street}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth name="houseNumber" label="House Number" id="houseNumber"
                            autoComplete="new-houseNumber" value={inputsValue.houseNumber} onChange={handleInputsChange} />
                        {errorsState?.houseNumber &&
                            <Alert severity="warning">{errorsState.houseNumber}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name="zip" label="Zip" id="zip" autoComplete="new-zip"
                            value={inputsValue.zip} onChange={handleInputsChange} />
                        {errorsState?.zip &&
                            <Alert severity="warning">{errorsState.zip}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel control={<Checkbox color="primary" onChange={handleInputsChangeCheck}
                            id="isBusiness" />} label="Business Account" />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Update</Button>
            </Box>
        </Box>
    );
};
