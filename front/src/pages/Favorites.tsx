import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Container } from '@mui/material';

import Card from '../components/Card';
import mutateCards from '../utils/mutateCards';
import Routes from '../routes/Routes';
import useQueryParams from '../hooks/useQueryParams';
import { Card as CardType } from '../@types';
import useCards from '../hooks/useCards';
import { AuthContext } from '../contexts/AuthContext';


export default function Favorites() {
    const cards = useCards(),
        [cardsState, setCardsState] = useState<CardType[]>(cards),
        user = useContext(AuthContext).data,
        query = useQueryParams(),
        navigate = useNavigate();

    useEffect(() => { if (user) setCardsState(mutateCards(cards, user._id)); }, [cards]);

    const
        filteredCards = useMemo(() => {
            return cardsState?.filter((card: CardType) =>
                card.title.startsWith(query.q ?? '')) ?? [];
        }, [query, cardsState]),
        onDeleteCard = (_id: string) => {
            try {
                axios.delete(`/cards/${_id}`);
            } catch (err) {
                console.log(err);
            }
            setCardsState((cards) => cards.filter((card: CardType) => card._id != _id));
        },
        onPhoneButtonClick = (_id: string) => navigate(`${Routes.Product}/${_id}`),
        onEditCard = (_id: string) => navigate(`${Routes.EditProduct}/${_id}`),
        onLikeCard = async (_id: string) => {
            try {
                await axios.patch(`/cards/${_id}`, []);
                setCardsState((currentData) => {
                    let item: CardType =
                        currentData.find((card: CardType) => card._id == _id)!;
                    if (item) item.liked = !item.liked;
                    return [...currentData];
                });
            } catch (err) {
                console.log("err", err);
            }
        };


    let likedCards = filteredCards.filter((card: CardType) => card.liked === true);

    return (<Container>
        <Grid container spacing={2}>
            {likedCards.map((card: CardType) => (
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
                        onDeleteButtonClick={onDeleteCard}
                        onEditButtonClick={onEditCard}
                        onLikeButtonClick={onLikeCard}
                        onEyeButtonClick={onPhoneButtonClick}
                    />
                </Grid>
            ))}
        </Grid>
    </Container>);
}