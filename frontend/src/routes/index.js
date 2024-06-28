import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import SigninPage from '../pages/SigninPage/SigninPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import UserPage from '../pages/UserPage/UserPage'
import InfoPage from '../pages/InfoPage/InfoPage'
import PromotionlistPage from '../pages/PromotionlistPage/PromotionlistPage'
import ProductDetailsPage from '../pages/ProductDetails/ProductDetailsPage'
import CartPage from '../pages/CartPage/CartPage'

export const routes =[
    {
        'path': '/',
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
        'path': '/login',
        'page': SigninPage,
    },
    {
        'path': '/register',
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
        'path': '/promotionlist',
        'page': PromotionlistPage,
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
        'path': '*',
        'page': NotFoundPage
    }
]