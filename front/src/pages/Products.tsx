import { useContext, useEffect, useState } from 'react'
import {
  AppBar,
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  Slider,
  Toolbar,
  Typography,
  TextField,
  SelectChangeEvent
} from '@mui/material';

import axios from 'axios';

import { CartContext } from '../contexts/CartContext'


import {
  Menu as MenuIcon,

  Inventory as InventoryIcon,
  Palette as PaletteIcon,
  PriceChange as PriceChangeIcon
} from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import useQueryParams from '../hooks/useQueryParams';

type Props = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function Products(props: Props) {

  //#region states
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const
    { addToCart, removeFromCart } = useContext(CartContext),
    [priceRange, setPriceRange] = useState<number[]>([0, 10000]),
    [color, setColor] = useState<string>("Any"),
    [condition, setCondition] = useState<string>("Any"),
    [products, setProducts] = useState<any[]>([]),
    params = useQueryParams();

  //#endregion


  useEffect(() => {
    console.log("change");
    axios.get('/products').then(({ data }) => {
      setProducts(data);
      console.log(data);
    }).catch((err) => { console.log("Error", err); });
  }, []);


  useEffect(() => {

    let filterString: string = '';

    if (condition != "Any") filterString += `&condition=${condition}`;
    if (color != "Any") filterString += `&color=${color}`;


    axios.get(`/products?q=${params.q}${filterString}&min_price=${priceRange[0]}&max_price=${priceRange[1]}`).then(({ data }) => {
      setProducts(data);
      console.log(data);
    }).catch((err) => { console.log("Error", err); });
  }, [condition, color, priceRange, params]);

  //#region drawer

  const drawerWidth = 240;

  //#region drawer events
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  }, handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  }, handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };


  //#endregion


  //#region events
  const
    priceRangeOnChange = (e: Event, value: any) => setPriceRange(value),
    onAddToCartButtonClick = (_id: string) => addToCart(_id),
    onRemoveFromCartButtonClick = (_id: string) => removeFromCart(_id),
    colorSelectOnChange = (e: SelectChangeEvent) => setColor(e.target.value),
    conditionSelectOnChange = (e: SelectChangeEvent) => setCondition(e.target.value),
    onDeleteButtonClick = (_id: string) => {
      try {
        axios.delete(`/products/${_id}`);
      } catch (err) {
        console.log(err);
      }
      setProducts((data) => data.filter((p) => p._id != _id));
    }

  //#endregion

  const container = window !== undefined ? () => window().document.body : undefined;


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="Price" disablePadding>
          <ListItemButton>
            <ListItemIcon><InventoryIcon /></ListItemIcon>
            <FormControl fullWidth>
              <InputLabel id="condition-label">Condition</InputLabel>
              <Select labelId="condition-label" label="Condition" onChange={conditionSelectOnChange} value={condition}>
                <MenuItem value={"Any"}>Any</MenuItem>
                <MenuItem value={"New"}>New</MenuItem>
                <MenuItem value={"Used"}>Used</MenuItem>
              </Select>
            </FormControl>

          </ListItemButton>
        </ListItem>
        <ListItem key="Price" disablePadding>
          <ListItemButton>
            <ListItemIcon><PaletteIcon /></ListItemIcon>

            <FormControl fullWidth>
              <InputLabel id="color-label">Color</InputLabel>
              <Select labelId="color-label" label="Color" onChange={colorSelectOnChange} value={color} >
                <MenuItem value={"Any"}>Any</MenuItem>
                <MenuItem value={"Black"}>Black</MenuItem>
                <MenuItem value={"Gray"}>Gray</MenuItem>
                <MenuItem value={"Red"}>Red</MenuItem>
                <MenuItem value={"Transparent"}>Transparent</MenuItem>
                <MenuItem value={"White"}>White</MenuItem>
                <MenuItem value={"White"}>Yellow</MenuItem>
              </Select>
            </FormControl>
          </ListItemButton>
        </ListItem>
        <ListItem key="Price" disablePadding>
          <ListItemButton>
            <ListItemIcon><PriceChangeIcon /></ListItemIcon>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={priceRange}
              max={10000}
              onChange={priceRangeOnChange}
              valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  //#endregion

  const currencies = {
    USD: "$",
    ILS: "₪"
  };




  return (

    <Box >
      <CssBaseline />

      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, top: "50px" }} >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders" >
        <Drawer container={container} variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose} ModalProps={{ keepMounted: true }} sx={{
            display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }} >
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: "50px" }
        }} open >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, }} >
        <Toolbar />

        <Container>
          <Grid container spacing={2} >

            {products.map((p) =>
              <Grid item key={p._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard _id={p._id} title={p.title} currencySymbol={currencies["USD"]} price={p.price} image={`http://localhost:8080/products/${p._id}.webp`}
                  shippingPrice={p.shippingPrice} onAddToCartButtonClick={onAddToCartButtonClick} onRemoveFromCartButtonClick={removeFromCart}
                  onDeleteButtonClick={onDeleteButtonClick} />
              </Grid>)}


          </Grid>
        </Container>
      </Box>

    </Box>
  )
}

