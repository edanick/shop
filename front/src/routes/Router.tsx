import { createBrowserRouter } from 'react-router-dom';

import Routes from './Routes';

import App from '../App';

import Home from '../pages/Home';
import About from '../pages/About';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Favorites from '../pages/Favorites';
import MyCards from '../pages/MyCards';
import Cart from '../pages/Cart';
import CreateProduct from '../pages/CreateProduct';
import EditCard from '../pages/EditProduct';
import ShowCard from '../pages/ShowCard';
import Error404 from '../pages/Error404';
import Panel from '../pages/Panel';
import Products from '../pages/Products';
import UpdateUser from '../pages/UpdateUser';

import AuthGuard from '../guard/AuthGuard';


export default createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [[Routes.Home, <Home />],
    [Routes.About, <About />],
    [Routes.Register, <Register />],
    [Routes.Login, <Login />],
    [Routes.Logout, <Logout />],
    [Routes.Cart, <Cart />],
    [Routes.Products, <Products />],
    [Routes.Favorites, <Favorites />],
    [Routes.MyCards, <MyCards />],
    [Routes.CreateProduct, <AuthGuard><CreateProduct /></AuthGuard>],
    [Routes.AdminPanel, <AuthGuard><Panel /></AuthGuard>],
    [`${Routes.Update}/:id`, <AuthGuard><UpdateUser /></AuthGuard>],
    [`${Routes.EditProduct}/:id`, <EditCard />],
    [`${Routes.Product}/:id`, <ShowCard />],
    ['*', <Error404 />]
    ].map(i => { return { path: String(i[0]), element: i[1] } })
}]);