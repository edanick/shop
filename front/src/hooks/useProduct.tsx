import { useEffect, useState } from 'react';


import { Product } from '../@types';
import getProduct from '../service/getProduct';

export default function useProduct(id: string) {
    const [product, setProduct] = useState<Product>(),
        [error, setError] = useState<any>();

    useEffect(() => {
        getProduct(id).then(({ data }) => {
            setProduct(data[0]);
        }).catch((err: any) => {
            setError(err);
        });
    }, []);

    return { product, error };
}