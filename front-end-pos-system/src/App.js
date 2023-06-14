import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import page
import ProductsList from './pages/ProductList/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import LeftNavbar from './components/landingPageComp/LeftNavbar';
import CashierLandingPage from './pages/CashierLandingPage/CashierLandingPage';
import Report from './pages/Report/Report';
import StaffPage from './pages/Staff/Staff';

function App() {
  return (
    <div className='flex gap-5 w-full h-inherit'>
      <LeftNavbar />

      <Routes>
        <Route path='/products' element={<ProductsList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/order' element={<CashierLandingPage />} />
        <Route path='/report' element={<Report />} />
        <Route path='/staff' element={<StaffPage />} />
      </Routes>
    </div>
  );
}

export default App;
