import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";

import PanelComponent from '../components/PanelComponent';
import { useNavigate } from "react-router-dom";
import Routes from '../routes/Routes';
import { toast } from "react-toastify";
import { User } from '../@types';

export default function Panel() {
    const [dataFromServer, setDataFromServer] = useState([]),

        navigate = useNavigate();

    useEffect(() => {
        axios.get("/users").then(({ data }) => {
            console.log("Users", data);
            setDataFromServer(data);
        }).catch((err) => { console.log("err", err); });
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`users/${id}`);
            const updatedUsers = dataFromServer.filter((user: User) => user._id !== id);
            setDataFromServer(updatedUsers);

            toast("User Deleted successfully 👌", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (err) {
            console.log("err", err);
        }
    },
        handleEditUser = (id: string) => navigate(`${Routes.Update}/${id}`);

    return (
        dataFromServer.map((user: User) => (
            <Box key={user._id}>
                <PanelComponent
                    id={user._id}
                    admin={user.isAdmin}
                    first={user.name.first}
                    last={user.name.last}
                    country={user.address.country}
                    city={user.address.city}
                    onDelete={handleDelete}
                    onEdit={handleEditUser}
                />
            </Box>
        ))
    );
};

