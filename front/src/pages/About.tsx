import { Box, Typography } from '@mui/material';


export default function About() {
    return (
        <Box>
            <Typography sx={{mb:3}} variant="h2">About</Typography>
            <Typography>
            eact makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug
            </Typography>
        </Box>
    );
}