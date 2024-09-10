import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import Routes from '../routes/Routes';

import { AuthContext } from '../contexts/AuthContext';

export default function AuthGuard({ children }: { children: JSX.Element | any }) {
    const loggedIn = useContext(AuthContext);
    return loggedIn ? children : <Navigate to={Routes.Login} replace={true} />;
}