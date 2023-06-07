import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import page
import ProductsList from './pages/ProductList/ProductList';
import LandingPage from './pages/LandingPage/LandingPage';
import LeftNavbar from './components/landingPageComp/LeftNavbar';

function App() {
  return (
    <div className='flex gap-5 w-full h-inherit'>    
    <LeftNavbar />

    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/products' element={<ProductsList />} />
    </Routes>
    </div>
  );
}

export default App;
