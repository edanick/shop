import { useContext } from 'react';

import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { getToken } from '../service/storageService';
import { AuthUser } from '../@types';
import { AuthContext } from '../contexts/AuthContext';


export default function useAuth() {

    const authContext = useContext(AuthContext);

    return async (skipTokenTest: boolean = false) => {

        try {

            const token = getToken();

            if (!token) return;

            const user: AuthUser = jwtDecode(token);

            if (skipTokenTest) await axios.get(`/users/${user._id}`);

            authContext.login(user);

        } catch (err) {

            console.log('Authenication error', err);
            localStorage.clear(); sessionStorage.clear();

        }

    }

}