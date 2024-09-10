import { Box, Typography } from '@mui/material';


export default function About() {
    return (
        <Box>
            <Typography sx={{ mb: 3 }} variant="h2">About</Typography>
            <Typography>
                React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug
            </Typography>

            <Typography sx={{ mb: 3 }} variant="h2">Register</Typography>
            <Typography>
                Presss the register nav link in the navbar to create a new account and fill in the required details
            </Typography>

            <Typography sx={{ mb: 3 }} variant="h2">Login</Typography>
            <Typography>
                Presss the login nav link in the navbar to login to your account
            </Typography>


            <Typography sx={{ mb: 3 }} variant="h2">Search</Typography>
            <Typography>
                Use the search text input to search for products
            </Typography>

            <Typography sx={{ mb: 3 }} variant="h2">View</Typography>
            <Typography>
                Press the eye icon to view a product
            </Typography>

            <Typography sx={{ mb: 3 }} variant="h2">Add to cart</Typography>
            <Typography>
                Press the add to cart icon to add product to cart
            </Typography>

            <Typography sx={{ mb: 3 }} variant="h2">Remove from cart</Typography>
            <Typography>
                Press the remove from cart icon to remove product from cart
            </Typography>

            <Typography sx={{ mb: 3 }} variant="h2">Cart</Typography>
            <Typography>
                Press the cart icon on the navbar to access your cart
            </Typography>


        </Box>
    );
}