import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Pedidos from './pages/Pedidos';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-vh-100 d-flex flex-column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
