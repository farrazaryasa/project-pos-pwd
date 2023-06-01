import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import page
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <>
    


    <Routes>
      <Route path='/' element={<LandingPage />} />
    </Routes>
    </>
  );
}

export default App;
