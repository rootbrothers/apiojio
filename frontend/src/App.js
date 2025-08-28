import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { HomePage, ProductsPage, SubscribePage, FreeTestPage, BlogPage, ContactPage } from "./pages/Pages";
import { Header, Footer, CartDrawer } from "./components/CloneUI";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/CartContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
  return null;
}

const ConnectivityCheck = () => {
  useEffect(() => {
    async function helloWorldApi() {
      try {
        const response = await axios.get(`${API}/`);
        console.log("Backend:", response.data.message);
      } catch (e) {
        console.log("Note: Backend not required yet. Frontend mocks active.");
      }
    }
    helloWorldApi();
  }, []);
  return null;
};

function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ScrollToHash />
      <ConnectivityCheck />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/free-test" element={<FreeTestPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;