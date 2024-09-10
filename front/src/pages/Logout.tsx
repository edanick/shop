import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Routes from '../routes/Routes';
import { AuthContext } from '../contexts/AuthContext';

export default function Logout() {
    const authContext = useContext(AuthContext);
    authContext.logout();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    toast("You logged out successfully 👌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return <Navigate to={Routes.Home} />;
}