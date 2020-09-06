import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import Self from './Views/Self/Self';
import Page from './Views/Page/Page';
import About from './Views/About/About';
import Auction from './Views/Auction/Auction';
import OrderConfirm from "./Views/Order/OrderConfirm";
import OrderPay from "./Views/Order/OrderPay";
import ActionPage from "./Views/Auction/AuctionPage";

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/self',
        component: Self

    },
    {
        path: '/page',
        component: Page

    },
    {
        path: '/about/:aid/:platform',
        component: About

    },
    {
        path: '/auctionPage',
        component: ActionPage
    },
    {
        path: '/auction/:aid',
        component: Auction

    },
    {
        path: '/orderConfirm/:showID',
        component: OrderConfirm

    },
    {
        path: '/orderPay/:orderID',
        component: OrderPay

    }
];

export default routes;
