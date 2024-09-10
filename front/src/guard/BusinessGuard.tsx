import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import Routes from "../routes/Routes";
import { AuthContext } from '../contexts/AuthContext';

export default function BuisnessGuard({ children }: { children: JSX.Element }) {
    const user = useContext(AuthContext).data;
    return (user && false) ? children : <Navigate to={Routes.Login} replace={true} />
}