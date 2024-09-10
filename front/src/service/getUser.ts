import axios from 'axios';

export default function getUser(id: string) { return axios.get(`/users/${id}`); }