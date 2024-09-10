import Routes from './Routes';

export const
    myLinks = [
        { to: Routes.Home, children: 'Home Page' },
        { to: Routes.About, children: 'About' }
    ], alwaysLinks = [
        { to: Routes.Home, children: 'Home' },
        { to: Routes.About, children: 'About' }
    ], loggedInLinks = [
        { to: Routes.Logout, children: 'Logout' }
    ], loggedOutLinks = [
        { to: Routes.Register, children: 'Register' },
        { to: Routes.Login, children: 'Login' }
    ], onlyAdmin = [
        { to: Routes.CreateProduct, children: 'Create Product' },
        { to: Routes.AdminPanel, children: 'Admin Panel' }
    ];

export default myLinks;