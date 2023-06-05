import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import page
import ProductsList from './pages/ProductList/ProductList';

function App() {
  return (
    <>
    


    <Routes>
      <Route path='/' element={<ProductsList />} />
    </Routes>
    </>
  );
}

export default App;
