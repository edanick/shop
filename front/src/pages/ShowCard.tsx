import { useParams } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';

import useCard from '../hooks/useProduct';

export default function ShowCard() {

    const { id } = useParams(),
        { card, error } = useCard(id!);

    console.log('Error retriving card data', error);

    return (card ?
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <img src={card.image ? card.image.url : "no pic"} alt="Company Logo" style={{ width: "100%", height: "auto" }} />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>{card.title}</Typography>
                        <Typography variant="h6" gutterBottom>{card.subtitle}</Typography>
                        <Typography variant="body1" paragraph>{card.description}</Typography>
                        <Typography variant="body1">
                            <strong>Phone:</strong> {card.phone}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {card.email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Web:</strong> {card.web}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Address:</strong>
                            {`${(() => {
                                let { country, city, street, houseNumber } = card.address;
                                return ` ${country}, ${city}, ${street}, ${houseNumber}`;
                            })()}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container> : "Loading"
    );
}