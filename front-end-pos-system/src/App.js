import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import page
import ProductsList from './pages/ProductList/ProductList';
import ProductDetails from './pages/DetailPage/ProductDetails';

function App() {
  return (
    <>
    


    <Routes>
      <Route path='/' element={<ProductsList />} />
      <Route path='/:product_id' element={<ProductDetails />} />
    </Routes>
    </>
  );
}

export default App;
