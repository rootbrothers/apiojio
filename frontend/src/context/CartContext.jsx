import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "../hooks/use-toast";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { toast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart.items");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart.items", JSON.stringify(items));
  }, [items]);

  const add = (product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        const next = prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
        toast({ title: "Cart updated", description: `${product.title} quantity increased` });
        return next;
      }
      toast({ title: "Added to cart", description: product.title });
      setOpen(true);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const inc = (id) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const dec = (id) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p)));
  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((a, b) => a + b.qty, 0);
    const amount = items.reduce((a, b) => a + b.qty * (b.price || 0), 0);
    return { count, amount };
  }, [items]);

  const value = { items, add, remove, inc, dec, clear, totals, open, setOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}