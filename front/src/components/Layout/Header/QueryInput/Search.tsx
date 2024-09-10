import { styled, alpha } from '@mui/material/styles';

export default styled("div")(({ theme }) => ({
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    width: "100%",
    marginLeft: 0,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
}));

