import { useContext } from 'react';

import { Box } from '@mui/material';

import nextKey from '../../../../utils/generate-my-key';

import { alwaysLinks, loggedInLinks, loggedOutLinks, onlyAdmin } from '../../../../routes/myLinks';
import NavLink from '../NavLink/NavLink';
import { AuthContext } from '../../../../contexts/AuthContext';

type Link = {
    to: string,
    children: string
}

export default function LinksVertical() {
    const { loggedIn, data: user } = useContext(AuthContext);

    return (
        <Box>
            {alwaysLinks.map((link: Link) => (
                <NavLink to={link.to} key={nextKey()}>{link.children}</NavLink>))}

            {loggedIn && loggedInLinks.map((link: Link) => (
                <NavLink to={link.to} key={nextKey()}>{link.children}</NavLink>))}

            {!loggedIn && loggedOutLinks.map((link: Link) => (
                <NavLink to={link.to} key={nextKey()}>{link.children}</NavLink>))}

            {(user?.isAdmin && loggedIn) && onlyAdmin.map((link: Link) => (
                <NavLink to={link.to} key={nextKey()}>{link.children}</NavLink>))}
        </Box>
    );
}