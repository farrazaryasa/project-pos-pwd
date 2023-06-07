import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import page
import ProductsList from './pages/ProductList/ProductList';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login';

function App() {
  return (
    <>    
    

    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/products' element={<ProductsList />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
