import { useContext, useEffect, useMemo, useState } from "react";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Container } from '@mui/material';

import mutateCards from '../utils/mutateCards';
import useQueryParams from '../hooks/useQueryParams';
import Card from "../components/Card";
import Routes from "../routes/Routes";

import { Card as CardType } from '../@types';
import { AuthContext } from "../contexts/AuthContext";

export default function MyCards() {
    const [cards, setCards] = useState<CardType[]>([]),
        user = useContext(AuthContext).data,
        query = useQueryParams(),
        navigate = useNavigate();

    useEffect(() => {
        axios.get('/cards').then(({ data }) => {
            if (user) data = mutateCards(data, user._id);
            setCards(data);
        }).catch((err) => { console.log("Error", err); });
    }, []);


    const
        filteredCards = useMemo(() => {
            return cards?.filter((c) => c.title.startsWith(query?.q ?? '')) ?? [];
        }, [query, cards]),

        onPhoneButtonClick = (_id: string) => navigate(`${Routes.Product}/${_id}`),
        onDeleteButtonClick = (_id: string) =>
            setCards((cards) => cards.filter((card) => card._id != _id)),
        onEditButtonClick = (_id: string) => { navigate(`${Routes.EditProduct}/${_id}`); },
        onLikeButtonClick = async (_id: string) => {

            try {
                await axios.patch(`/cards/${_id}`, []);
                setCards((cards) => {
                    let item = cards.find((card) => card._id == _id);
                    if (item) item.liked = !item.liked;
                    return [...cards];
                });

            } catch (err) {
                console.log("err", err);
            }

        },

        MyCards = filteredCards.filter((card) => card.user_id === user._id);

    return (<Container>
        <Grid container spacing={2}>
            {MyCards.map((card) => (
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
    </Container>);
}
