import { useEffect, useMemo, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid } from '@mui/material';

import Card from '../components/Card';
import mutateCards from '../utils/mutateCards';
import Routes from '../routes/Routes';
import useCards from '../hooks/useCards';
import useQueryParams from '../hooks/useQueryParams';
import { Card as CardType } from '../@types';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
    const cards = useCards(),
        [data, setdata] = useState<CardType[]>([]),
        navigate = useNavigate(),
        user = useContext(AuthContext),
        query = useQueryParams();

    useEffect(() => { if (user) { setdata(mutateCards(cards, user?.data?._id)); } else { setdata(cards) } }, [cards]);

    const filteredCards = useMemo(() => {
        return (!data.length) ? [] : data.filter((card: CardType) => card.title.startsWith(query.q ?? ''));
    }, [query, data]),

        onDeleteButtonClick = (_id: string) => {
            try {
            axios.delete(`/cards/${_id}`);
            } catch (err) {
                console.log(err);
            }
            setdata((data) => data.filter((card) => card._id != _id));
        },
        onEditButtonClick = (_id: string) => navigate(`${Routes.EditProduct}/${_id}`),
        onPhoneButtonClick = (_id: string) => navigate(`${Routes.Product}/${_id}`),
        onLikeButtonClick = async (_id: string) => {
            try {
                await axios.patch(`/cards/${_id}`, []);
                setdata((data) => {
                    let item = data.find((card) => card._id == _id);
                    if (item) item.liked = !item.liked;
                    return [...data];
                });
            } catch (err) { console.log('Error liking card', err); }
        };

    return (
        <Container>
            <Grid container spacing={2}>
                {filteredCards.map((card) => (
                    <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            _id={card._id}
                            title={card.title}
                            subtitle={card.subtitle}
                            phone={card.phone}
                            address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
                            img={card.image.url}
                            alt={card.image.alt}
                            like={Boolean(card.liked)}
                            cardNumber={String(card.__v)}
                            userId={card.user_id}
                            onDeleteButtonClick={onDeleteButtonClick}
                            onEditButtonClick={onEditButtonClick}
                            onLikeButtonClick={onLikeButtonClick}
                            onEyeButtonClick={onPhoneButtonClick}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}