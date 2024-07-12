import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import SigninPage from '../pages/SigninPage/SigninPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import UserPage from '../pages/UserPanelPage/UserPage/UserPage'
import InfoPage from '../pages/UserPanelPage/InfoPage/InfoPage'
import ProductDetailsPage from '../pages/ProductDetails/ProductDetailsPage'
import CartPage from '../pages/CartPage/CartPage'
import SearchPage from '../pages/SearchPage/SearchPage'
import AdminHomePage from '../pages/AdminPage/AdminHome/AdminHome'
import HistoryOrderpage from '../pages/UserPanelPage/HistoryOrderpage/HistoryOrderpage'
import ChangePassPage from '../pages/UserPanelPage/ChangePassPage/ChangePassPage'
import SupportPage from '../pages/UserPanelPage/SupportPage/SupportPage'
import PaymentInfo from '../pages/PaymentPage/PaymentInfoPage'
import Payment from '../pages/PaymentPage/PaymentPage'
import AdminUser from '../pages/AdminPage/AdminUser/AdminUser'
import AdminProduct from '../pages/AdminPage/AdminProduct/AdminProduct'
import AdminOrder from '../pages/AdminPage/AdminOrder/AdminOrder'
import { Navigate } from 'react-router-dom'; 

export const routes =[
    {
        'path': '/',
        page: () => <Navigate to="/home" />
    },
    {
        'path': '/home',
        'page': HomePage,
        isShowHeader: true
    },
    {
        'path': '/order',
        'page': OrderPage,
        isShowHeader: true
    },
    {
        'path': '/product',
        'page': ProductsPage,
        isShowHeader: true
    },
    {
        'path': '/auth/log_in',
        'page': SigninPage,
    },
    {
        'path': '/auth/sign_up',
        'page': SignupPage,
    },
    {
        'path': '/user',
        'page': UserPage,
        isShowHeader: true
    },
    {
        'path': '/user/info',
        'page': InfoPage,
        isShowHeader: true
    },
    {
        'path': '/user/order',
        'page': HistoryOrderpage,
        isShowHeader: true
    },
    {
        'path': '/user/change_pass',
        'page': ChangePassPage,
        isShowHeader: true
    },
    {
        'path': '/user/support',
        'page': SupportPage,
        isShowHeader: true
    },
    {
        'path': '/product_detail',
        'page': ProductDetailsPage,
        isShowHeader: true
    },
    {
        'path': '/cart',
        'page': CartPage,
    },
    {
        'path': '/cart/payment_info',
        'page': PaymentInfo,
    },
    {
        'path': '/cart/payment',
        'page': Payment,
    },
    {
        'path': '/search',
        'page': SearchPage,
        isShowHeader: true
    },
    {
        'path': '/admin',
        'page': AdminHomePage
    },
    {
        'path': '/admin/member',
        'page': AdminUser
    },
    {
        'path': '/admin/product',
        'page': AdminProduct
    },
    {
        'path': '/admin/order',
        'page': AdminOrder
    },
    {
        'path': '*',
        'page': NotFoundPage
    }
]