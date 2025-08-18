import './App.css'
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      
    </Routes>
  );
}

export default App
