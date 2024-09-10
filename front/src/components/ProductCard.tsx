import { useContext } from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Typography
} from "@mui/material";

import {
    AddShoppingCart as AddShoppingCartIcon,
    RemoveShoppingCart as RemoveShoppingCartIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Visibility as VisibilityIcon
} from "@mui/icons-material";

import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
    _id: string,
    title: string,
    currencySymbol: string,
    price: number,
    shippingPrice: number,
    image?: string,
    onAddToCartButtonClick?: (_id: string) => void,
    onRemoveFromCartButtonClick?: (_id: string) => void
    onDeleteButtonClick?: (_id: string) => void
}

export default function ProductCard({ _id, title, currencySymbol, price, shippingPrice, image = 'https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg', onAddToCartButtonClick, onRemoveFromCartButtonClick, onDeleteButtonClick }: Props) {

    const { isInCart } = useContext(CartContext);
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Card sx={{ boxShadow: 1, minHeight: 446 }}>

            <CardActionArea>
                <CardMedia component="img" sx={{ minHeight: 180, maxHeight: 180 }} alt={title} image={image} />
            </CardActionArea>

            <CardContent>

                <CardHeader sx={{ p: 0, mb: 1 }} title={title} />

                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">
                        <Typography component="span" variant="subtitle1" fontWeight="700">{currencySymbol}{price}</Typography>
                    </Typography>
                    <Typography variant="body2">
                        <Typography component="span" variant="subtitle1" fontWeight="700">{currencySymbol}{shippingPrice} Shipping</Typography>
                    </Typography>
                </Box>

                <Divider />

                <Box display="flex" justifyContent="space-between" >
                    <Box>
                        {(user?.loggedIn && user?.data?.isAdmin) &&
                            <IconButton onClick={() => { if (onDeleteButtonClick) onDeleteButtonClick(_id); }}><DeleteIcon /></IconButton>}

                        {(user?.loggedIn && user?.data?.isAdmin) &&
                            <IconButton onClick={() => { navigate(`/editproduct/${_id}`) }}><EditIcon /></IconButton>}
                    </Box>
                    <Box>
                        {isInCart(_id) ? <IconButton onClick={() => { if (onRemoveFromCartButtonClick) onRemoveFromCartButtonClick(_id); }}><RemoveShoppingCartIcon /></IconButton> :
                            <IconButton onClick={() => { if (onAddToCartButtonClick) onAddToCartButtonClick(_id); }} ><AddShoppingCartIcon /></IconButton>}

                        <IconButton onClick={() => { navigate(`/product/${_id}`) }} ><VisibilityIcon /></IconButton>
                    </Box>
                </Box>
            </CardContent>


        </Card>
    );
}