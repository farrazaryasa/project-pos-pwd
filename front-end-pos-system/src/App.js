import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';

// import page
import ProductsList from './pages/ProductList/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import LeftNavbar from './components/landingPageComp/LeftNavbar';
import CashierLandingPage from './pages/CashierLandingPage/CashierLandingPage';
import Report from './pages/Report/Report';
import StaffPage from './pages/Staff/Staff';
import ProtectionPage from './pages/protectionPage';

function App() {
  const navigate = useNavigate()

  const AdminOnly = (props) => {
    const checkStorage = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null
    if (checkStorage === null) {
      return navigate('/login')
    } else if (checkStorage.is_admin === false) {
      return navigate('/unauthorized')
    }

    return props.children ? props.children : <Outlet />
  }

  const LoginOnly = (props) => {
    const checkStorage = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null
    if (checkStorage === null) {
      return <Navigate to={'/login'} />
    }

    return props.children ? props.children : <Outlet />
  }

  return (
    <div className='flex gap-5 w-full h-inherit'>
      <Routes>
        <Route path='/products' element={<LoginOnly><LeftNavbar /><ProductsList /></LoginOnly>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<AdminOnly><LeftNavbar /><Register /></AdminOnly>} />
        <Route path='/order' element={<LoginOnly><LeftNavbar /><CashierLandingPage /></LoginOnly>} />
        <Route path='/report' element={<AdminOnly><LeftNavbar /><Report /></AdminOnly>} />
        <Route path='/staff' element={<AdminOnly><LeftNavbar /><StaffPage /></AdminOnly>} />
        <Route path='/unauthorized' element={<LoginOnly><LeftNavbar /><ProtectionPage /></LoginOnly>} />
      </Routes>
    </div>
  );
}

export default App;
