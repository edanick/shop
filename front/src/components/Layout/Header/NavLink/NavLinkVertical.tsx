import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function NavLinkComponentVertical(
    { to, children }: { to: string, children: JSX.Element }) {
    return (
        <NavLink to={to} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
                <Typography variant="h5" sx={{ p: 0.5, ml: 0, '&:hover': { color: "lime" } }}
                    color={isActive ? "text.headerActive" : "text.headerColor"}>
                    {children}
                </Typography>
            )}
        </NavLink>
    );
};