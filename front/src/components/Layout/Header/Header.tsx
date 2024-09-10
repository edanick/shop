import { useState, useContext } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { AppBar, Box, IconButton, Menu, MenuItem, Switch, Toolbar, Typography } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Links from './Links/Links';
import QueryInput from './QueryInput/QueryInput';
import LinksVertical from './Links/LinksVertical';

import { StyledBadge } from '../../StyledBadge';

import { CartContext } from '../../../contexts/CartContext';

type HeaderProps = {
    isDarkTheme: boolean,
    onThemeToggleChange: (toggled: boolean) => void
}

export default function Header({ isDarkTheme, onThemeToggleChange }: HeaderProps) {
    const [anchorEl, setanchorEl] = useState<HTMLElement>(null!),
        [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLElement>(null!),

        { totalProductsAmount } = useContext(CartContext),

        location = useLocation(),
        navigate = useNavigate(),

        isMenuOpen = Boolean(anchorEl),
        isMobileMenuOpen = Boolean(mobileMoreAnchorEl),

        allowedPaths = ['/', '/favorites', '/products'],

        allowedToRender = allowedPaths.includes(location.pathname),

        onMobileMenuClose = () => setMobileMoreAnchorEl(null!),
        onMenuClose = () => { setanchorEl(null!); onMobileMenuClose(); },
        onMobileMenuOpen = (e: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(e.currentTarget),
        onToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => onThemeToggleChange(e.target.checked),

        menuId = 'primary-search-account-menu',

        menu = (
            <Menu id={menuId} keepMounted open={isMenuOpen} anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={onMenuClose} >
                <MenuItem onClick={onMenuClose}>Profile</MenuItem>
                <MenuItem onClick={onMenuClose}>My account</MenuItem>
            </Menu>
        ),

        mobileMenuId = 'primary-search-account-menu-mobile',

        MobileMenu = (
            <Menu id={mobileMenuId} keepMounted open={isMobileMenuOpen}
                anchorEl={mobileMoreAnchorEl} onClose={onMobileMenuClose}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }} >
                <MenuItem><LinksVertical /></MenuItem>
            </Menu>
        );

    return (
        <Box sx={{ flexGrow: 1, mt: -1, mb: 2 }}>
            <AppBar position="static" sx={{ maxHeight: 60, mt: 0.5 }}>
                <Toolbar>

                    <Typography variant="h5" noWrap component="div"
                        sx={{ display: { xs: "none", sm: "block" } }}>Shop</Typography>

                    <Links />

                    {allowedToRender && <QueryInput />}

                    <Box sx={{ my: 2, p: 1 }}>
                        <Typography sx={{ display: { xs: "none", md: "inline" } }}>
                            {isDarkTheme ? "Dark" : "Light"} Mode
                        </Typography>
                        <Switch checked={isDarkTheme} onChange={onToggleChange} />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "flex", md: "flex", lg: "none" } }}>
                        <IconButton size="large" aria-label="show more" aria-haspopup="true"
                            aria-controls={mobileMenuId} onClick={onMobileMenuOpen}
                            color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>

                    <IconButton onClick={()=> {navigate('/cart')}} aria-label="cart">
                        <StyledBadge badgeContent={totalProductsAmount} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>


                </Toolbar>
                
            </AppBar>
            {MobileMenu}{menu}
        </Box>
    );
}