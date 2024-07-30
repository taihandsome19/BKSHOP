import HomePage from '../pages/HomePage/HomePage'
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
import PaymentStatusPage from '../pages/PaymentPage/PaymentStatusPage'
import OrderDetailPage from '../pages/UserPanelPage/OrderDetailPage/OrderDetailPage'
import Notice from '../pages/NoticePage/Notice'
import { Navigate } from 'react-router-dom';

  

export const routes = [
  {
    path: '/',
    page: () => <Navigate to="/home" />,
  },
  {
    path: '/home',
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: '/product/brand',
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: '/auth/log_in',
    page: SigninPage,
    isProtected: true,
    trigger: true,
    redirectTo: '/home',
  },
  {
    path: '/auth/sign_up',
    page: SignupPage,
    isProtected: true,
    trigger: true,
    redirectTo: '/home',
  },
  {
    path: '/user',
    page: UserPage,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/user/info',
    page: InfoPage,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/user/order',
    page: HistoryOrderpage,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/user/order/detail',
    page: OrderDetailPage,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/user/change_pass',
    page: ChangePassPage,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/user/support',
    page: SupportPage,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/user/notice',
    page: Notice,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/product/detail',
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: '/cart',
    page: CartPage,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/cart/payment_info',
    page: PaymentInfo,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/cart/payment',
    page: Payment,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/payment/status',
    page: PaymentStatusPage,
    isShowHeader: true,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/search',
    page: SearchPage,
    isShowHeader: true,
  },
  {
    path: '/admin',
    page: AdminHomePage,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/admin/member',
    page: AdminUser,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/admin/product',
    page: AdminProduct,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '/admin/order',
    page: AdminOrder,
    isProtected: true,
    redirectTo: '/auth/log_in',
  },
  {
    path: '*',
    page: NotFoundPage,
  },
];
