import './style.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './layout/Header'
import Navbar from './layout/Navbar'

import Home from './pages/Home'
import Product from './pages/Product'

function App() {
  return (
    <Router basename="/innoloft-solution">
      <div className="App">
        <Header />
        <div className="main">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:num" element={<Product />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
