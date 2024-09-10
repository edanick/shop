import { Fragment } from 'react';
import { BottomNavigation } from '@mui/material';
import Links from '../Layout/Header/Links/Links';

export default function Footer() {
    return (
        <Fragment>
            <BottomNavigation sx={{ mt: 2, pt: 0.5, boxShadow: 2 }} showLabels>
                <div><Links /></div>
            </BottomNavigation>
        </Fragment>
    );
}