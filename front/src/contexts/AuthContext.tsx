import { createContext, useState, useEffect } from "react";

import { AuthUser } from "../@types";

export const AuthContext = createContext({
    data: {
        _id: '',
        isAdmin: false,
        iat: 0
    },
    loggedIn: false,
    failedAttempts: 0,
    lastFailedAttempt: new Date(0),
    login: (user: AuthUser) => { },
    logout: () => { },
    setFailedAttempts: (attempts: number) => { }
});

export const AuthProivder = ({ children }: any) => {

    const [data, setData] = useState<AuthUser>(null!),
        [loggedIn, setLoggedIn] = useState<boolean>(false),
        [failedAttempts, setFailedAttemptsState] = useState<number>(0),
        [lastFailedAttempt, setLastFailedAttempt] = useState<Date>(new Date()),


        login = (user: AuthUser) => {
            setData(user);
            setLoggedIn(true);
        },

        logout = () => {
            setLoggedIn(false);
        },

        setFailedAttempts = (attempts: number) => {
            localStorage.setItem("failed_login_attempts", String(attempts));
            setFailedAttemptsState(attempts);
            let date = new Date();
            localStorage.setItem("last_failed_login_attempt_date", date.toString());
            setLastFailedAttempt(date);
        };

        useEffect(()=> {
            setFailedAttemptsState(parseInt(localStorage.getItem("failed_login_attempts") ?? "0"));
            setLastFailedAttempt(new Date(Date.parse(localStorage.getItem("last_failed_login_attempt_date") ?? new Date(0).toString())));

            const now = new Date(), lastRequest = new Date(Date.parse(localStorage.getItem('last_request') ?? new Date().toString()));

            if (now.getTime() - lastRequest.getTime() > 14400000) {
                logout();
            }

            localStorage.setItem('last_request', now.toString());

        }, []);

    return (
        <AuthContext.Provider value={{ data, loggedIn, failedAttempts, lastFailedAttempt, login, logout, setFailedAttempts }}>
            {children}
        </AuthContext.Provider>
    );
}