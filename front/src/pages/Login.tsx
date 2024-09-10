import { useContext, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { storeToken } from '../service/storageService';
import useAuth from '../hooks/useAuth';
import Routes from '../routes/Routes';
import { validateLogin } from '../validation/loginValidation';
import { AuthContext } from '../contexts/AuthContext';

type LoginState = {
    email: string,
    password: string,
    remember: boolean
}

export default function Login() {
    const [state, setState] = useState<LoginState>({ email: '', password: '', remember: false }),
        { email, password, remember } = state,
        [errorsState, setErrorsState] = useState<any>(null),

        authContext = useContext(AuthContext),


        navigate = useNavigate(),
        authenicate = useAuth();

    const updateStateProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { target } = e;
        setState({ ...state, ...{ [target.id]: target.type == 'checkbox' ? target.checked : target.value } });
    },
        onSubmitButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
            
            e.preventDefault();


            if (authContext.failedAttempts == 3) {

                if ((new Date().getTime() - authContext.lastFailedAttempt.getTime()) > 24 * 60 * 60 * 1000) {
                    authContext.setFailedAttempts(0);
                } else {
                    toast.error("You have failed too many attempted logins", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                    return;
                }

            }


            const joiResponse = validateLogin({ email: email, password: password });
            console.log("joiResponse", joiResponse);
            setErrorsState(joiResponse);
            if (joiResponse) return;

            try {
                let { data } = await axios.post('/users/login', { email: state.email, password: state.password });

                storeToken(data, remember);
                authenicate(true);
                navigate(Routes.Home);

                toast("You logged in successfully 👌", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
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
                authContext.setFailedAttempts(authContext.failedAttempts + 1);
            }   
        };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>

            <CssBaseline />

            <Grid item xs={false} sm={4} md={7} sx={{
                backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) => t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ mx: 4, my: 8, display: "flex", flexDirection: "column", alignItems: "center" }} >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <Box component="form" noValidate onSubmit={onSubmitButtonClick} sx={{ mt: 1 }}           >

                        <TextField
                            margin="normal" required fullWidth id="email" autoFocus
                            label="Email Address" name="email" autoComplete="email"
                            value={email} onChange={updateStateProperty} />
                        {(errorsState && errorsState.email) &&
                            <Alert severity="warning">{errorsState.email}</Alert>}

                        <TextField margin="normal" required fullWidth name="password"
                            label="Password" type="password" id="password" value={password}
                            autoComplete="current-password" onChange={updateStateProperty} />
                        {(errorsState && errorsState.password) &&
                            <Alert severity="warning">{errorsState.password}</Alert>}

                        <FormControlLabel label="Remember me" control={<Checkbox id="remember"
                            value="remember" color="primary" checked={remember}
                            onChange={updateStateProperty} />} />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Login</Button>

                        <Grid container>
                            <Grid item xs><Link href="#" variant="body2">Forgot password?</Link></Grid>
                            <Grid item><Link href="/register" variant="body2">Don't have an account? Register</Link></Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}