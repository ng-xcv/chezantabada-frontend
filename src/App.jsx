import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import Orders from '@/pages/Orders'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminProducts from '@/pages/admin/Products'
import AdminOrders from '@/pages/admin/AdminOrders'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminRoute from '@/components/AdminRoute'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/paiement" element={<Checkout />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/commandes" element={<Orders />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/produits" element={<AdminProducts />} />
              <Route path="/admin/commandes" element={<AdminOrders />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
