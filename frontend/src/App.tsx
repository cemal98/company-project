import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout';
// import Home from './pages/Home';
// import Companies from './pages/Companies';
// import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Başlangıç rotasını login'e yönlendir */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Private rotalar */}
        <Route
          path="*"
          element={
            <AppLayout>
              <Routes>
                {/* <Route path="/home" element={<Home />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/products" element={<Products />} /> */}
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
