import * as React from 'react';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

import { Create as CreateIcon, Delete as DeleteIcon } from '@mui/icons-material';


type Props = {
    id: string,
    admin: boolean,
    first: string,
    last: string,
    country: string
    city: string,
    onDelete: any,
    onEdit: any
}

export default function PanelComponent({ id, admin, first, last,
    country, city, onDelete, onEdit, }: Props) {

    const handleDelete = () => onDelete(id),
        handleEdit = () => onEdit(id);


    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar> <Avatar alt="User avatar" /></ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography sx={{ display: 'inline', fontWeight: 500 }} component="span"
                                variant="subtitle2" color={admin ? 'red' : 'text.primary'} >
                                {(admin ? "Admin " : "User ")}
                            </Typography>
                        </React.Fragment>}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', fontWeight: 500 }} component="span"
                                variant="subtitle2" color="text.primary" >
                                {first + " " + last + " - "}
                            </Typography>
                            {country + ", " + city}.
                        </React.Fragment>
                    }
                />
                <IconButton onClick={handleDelete}> <DeleteIcon /></IconButton>
                <IconButton onClick={handleEdit}> <CreateIcon /></IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}
