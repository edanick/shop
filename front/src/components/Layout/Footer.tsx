import { Fragment } from 'react';
import { BottomNavigation } from '@mui/material';
import Links from '../Layout/Header/Links/Links';

export default function Footer() {
    return (
        <Fragment>
            <BottomNavigation sx={{ mt: 2, pt: 0.5, boxShadow: 2 }} showLabels>
                <div>
                    Shop © 2024
                    <br />
                    Contact customer_service@shop.com
                </div>
            </BottomNavigation>
        </Fragment>
    );
}