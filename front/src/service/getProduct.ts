import axios from 'axios';

export default function getProduct(id: string) { return axios.get(`/products?id=${id}`); }