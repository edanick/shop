import { useEffect, useState } from 'react';


import { RegisterUser } from '../@types';
import getuser from '../service/getUser';

export default function useUser(id: string) {
    const [user, setUser] = useState<RegisterUser>(),
        [error, setError] = useState<any>();

    useEffect(() => {
        getuser(id).then(({ data }) => {
            setUser(data);
        }).catch((err: any) => {
            setError(err);
        });
    }, []);

    return { user, error };
}