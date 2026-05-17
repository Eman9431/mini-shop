import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ProductListAdmin from './components/admin/ProductListAdmin';
import ProductListCustomer from './components/customer/ProductListCustomer';
import ProductRegister from './components/admin/ProductRegister';
import Cart from "./components/customer/Cart";
import Header from './Header';
import CustomerRegister from "./components/customer/CustomerRegister";
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Profile from './components/Profile.jsx';

function App() {
  const [refreshProducts, setRefreshProducts] = useState(0);

  const handleProductAdded = () => {
    setRefreshProducts(prev => prev + 1);
  };

  return (
    <div style={{ 
      alignItems: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      width: '100%' 
    }}>  

      <Header />

      <div style={{ flex: 1, width: '90%' }}>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          <Route 
            path="/custReg" 
            element={
              <ProtectedRoute allowedRoles="customer">
                <CustomerRegister />
              </ProtectedRoute>
            } 
          />

          {/* Customer Routes */}
          <Route path="/clist" element={<ProductListCustomer />} />

          <Route 
            path="/cart" 
            element={
              <ProtectedRoute allowedRoles="customer">
                <Cart />
              </ProtectedRoute>
            } 
          />

          {/* ✅ FIXED: Profile must be its own route */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles="customer">
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/alist" 
            element={
              <ProtectedRoute allowedRoles="admin">
                <ProductListAdmin refreshTrigger={refreshProducts} />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/register" 
            element={
              <ProtectedRoute allowedRoles="admin">
                <ProductRegister onProductAdded={handleProductAdded} />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;