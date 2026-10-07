
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <div className="page-shell">
      {!isLogin && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isLogin && <Footer />}
    </div>
  );
}