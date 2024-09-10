import { Typography } from '@mui/material';
import { NavLink as RouterNavLink } from 'react-router-dom';

type Props = {
    to: string,
    children: string
}

export default function NavLink({ to, children }: Props) {
    return (
        <RouterNavLink to={to} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
                <Typography variant="h5" color={isActive ? "text.headerActive" : "text.headerColor"}
                    sx={{ ml: 4, '&:hover': { color: "lime" }, fontFamily: 'Arial' }}>
                    {children}
                </Typography>
            )}
        </RouterNavLink>
    );
}
