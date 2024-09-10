import { Box, Button, Grid, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
    const navigate = useNavigate();
    return (
        <Box sx={{
            display: "flex", justifyContent: "center",
            alignItems: "center", minHeight: "100vh"
        }}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h1">404</Typography>
                        <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
                        <Button variant="contained" onClick={() => { navigate('/'); }}>Back Home</Button>
                    </Grid>
                    <Grid xs={6}>
                        <img alt="" width={500} height={250}
                            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}