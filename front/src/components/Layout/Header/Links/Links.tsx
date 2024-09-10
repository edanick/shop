import { useContext } from 'react';

import { Box } from '@mui/material';

import nextKey from '../../../../utils/generate-my-key';

import { alwaysLinks, loggedInLinks, loggedOutLinks, onlyAdmin } from '../../../../routes/myLinks';
import NavLink from '../NavLink/NavLink';
import { AuthContext } from '../../../../contexts/AuthContext';

export default function Links() {
    const { loggedIn, data: user } = useContext(AuthContext);

    return (
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "none", lg: "flex" } }}>

            {alwaysLinks.map((link) => (
                <NavLink to={link.to} key={nextKey()}>{link.children}</NavLink>
            ))}


            {loggedIn && loggedInLinks.map((link) => (
                <NavLink to={link.to} key={nextKey()}>
                    {link.children}
                </NavLink>
            ))}

            {!loggedIn && loggedOutLinks.map((link) => (
                <NavLink to={link.to} key={nextKey()}>
                    {link.children}
                </NavLink>
            ))}
            {(user?.isAdmin && loggedIn) && onlyAdmin.map((link) => (
                <NavLink to={link.to} key={nextKey()}>
                    {link.children}
                </NavLink>
            ))}
        </Box>
    );
}