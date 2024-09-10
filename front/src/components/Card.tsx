import { useContext } from 'react';

import { Box, Card as MuiCard, CardActionArea, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import { Create as CreateIcon, Delete as DeleteIcon, Favorite as FavoriteIcon, Visibility as EyeIcon } from '@mui/icons-material';

import { AuthContext } from '../contexts/AuthContext';

type CardProps = {
  _id: string,
  title: string,
  subtitle?: string,
  phone?: string,
  address?: string,
  img?: string,
  alt?: string,
  like?: boolean,
  cardNumber?: string,
  userId?: string,
  onDeleteButtonClick: (_id: string) => void,
  onEditButtonClick: (_id: string) => void,
  onLikeButtonClick: (_id: string) => void,
  onEyeButtonClick?: (_id: string) => void
}

export default function Card({ _id, title, subtitle, phone, address, like, cardNumber, userId, onDeleteButtonClick,
  onEditButtonClick, onLikeButtonClick, onEyeButtonClick: onEyeButtonClick,
  img = 'https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg',
  alt = 'running' }: CardProps) {


  const user = useContext(AuthContext);

  return (
      <MuiCard sx={{ boxShadow: 1, minHeight: 446 }}  >

        <CardActionArea>
          <CardMedia component="img" sx={{ minHeight: 180, maxHeight: 180 }} alt={alt} image={img} />
        </CardActionArea>

        <CardContent>

          <CardHeader sx={{ p: 0, mb: 1 }} title={title} subheader={subtitle} />

          <Divider />

          <Box sx={{ mt: 1 }}>

            <Typography variant="body2">
              <Typography component="span" variant="subtitle1" fontWeight="700" >Phone: </Typography> {phone}
            </Typography>

            <Typography variant="body2">
              <Typography component="span" variant="subtitle1" fontWeight="700" >Address: </Typography> {address}
            </Typography>

            <Typography variant="body2">
              <Typography component="span" variant="subtitle1" fontWeight="700" >Card Number: </Typography> {cardNumber}
            </Typography>

          </Box>

          <Box display="flex" justifyContent="space-between" >

            <Box>
              <IconButton onClick={() => { if (onEyeButtonClick) onEyeButtonClick(_id); }}><EyeIcon /></IconButton>
              {(user?.loggedIn && (user?.data?._id === userId || user?.data?.isAdmin)) &&
                <IconButton onClick={() => { onEditButtonClick(_id); }}><CreateIcon /></IconButton>}
            </Box>

            <Box>
              {(user?.loggedIn && user?.data?.isAdmin) &&
                <IconButton onClick={() => { onDeleteButtonClick(_id); }}><DeleteIcon /></IconButton>}
              {user?.loggedIn &&
                <IconButton onClick={() => { onLikeButtonClick(_id); }} >
                  <FavoriteIcon sx={{ color: like ? "red" : "gray" }} />
                </IconButton>}
            </Box>

          </Box>

        </CardContent>

      </MuiCard>
  );
}