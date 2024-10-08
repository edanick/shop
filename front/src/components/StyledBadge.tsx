import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BadgeProps } from '@mui/material/Badge';


export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));