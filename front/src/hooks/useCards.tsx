import { useEffect, useState } from 'react';
import axios from 'axios';

import { Card } from '../@types';

export default function useCards() {

    const [dataState, setdataState] = useState<Card[]>([]);

    useEffect(() => {
        axios
            .get("/cards")
            .then(({ data }) => {
                setdataState(data);
            })
            .catch((err: any) => {
                console.log("err", err);
            });
    }, []);

    return dataState;
}