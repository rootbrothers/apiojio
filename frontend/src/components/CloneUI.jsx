import React, { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useCart } from "../context/CartContext";
import { useToast } from "../hooks/use-toast";
import { platforms } from "../mock/mock";
import { ShoppingCart, Search, CheckCircle2, Zap, Shield, Users, Percent, CreditCard, Cog } from "lucide-react";

export function Header() {
  const { totals, setOpen } = useCart();
  const location = useLocation();
  const nav = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/subscribe", label: "Subscribe" },
    { to: "/free-test", label: "Free Test" },
    { to: "/products#case-studies", label: "Case Studies" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/payments", label: "Payments" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="font-semibold tracking-tight text-lg">
          Popular<span className="text-primary"> SMM</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground ${
                  (isActive || (location.hash && n.to.includes(location.hash))) ? "bg-accent" : ""
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-md border px-2">
            <Search size={16} className="text-muted-foreground" />
            <Input placeholder="Search packages" className="h-8 border-0 focus-visible:ring-0" />
          </div>
          <Button variant="secondary" className="hidden sm:inline-flex" asChild>
            <Link to="/products">Browse</Link>
          </Button>
          <Button className="hidden sm:inline-flex" asChild>
            <Link to="/subscribe">Start Subscription</Link>
          </Button>
          <Button variant="outline" className="relative" onClick={() => setOpen(true)}>
            <ShoppingCart size={18} />
            {totals.count > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-primary text-primary-foreground px-2 text-[10px]">
                {totals.count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="mb-2 font-semibold text-lg">PopularSMM</div>
          <p className="text-sm text-muted-foreground">Premium social growth services with instant delivery and 24/7 support.</p>
        </div>
        <div>
          <div className="mb-2 font-semibold">Services</div>
          <ul className="space-y-2 text-sm">
            {platforms.map((p) => (
              <li key={p.key}>
                <Link to={`/products?platform=${p.key}`} className="hover:underline">{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 font-semibold">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-2 font-semibold">Why Us</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Zap size={16}/> Instant Delivery</li>
            <li className="flex items-center gap-2"><Users size={16}/> Real Users</li>
            <li className="flex items-center gap-2"><Shield size={16}/> Lifetime Guarantee</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} PopularSMM (Clone). All rights reserved.</div>
    </footer>
  );
}

export function ProductCard({ item, onAdd }) {
  return (
    <Card className="group">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{item.qtyLabel}</Badge>
          {item.discount ? (
            <Badge className="flex items-center gap-1"><Percent size={14}/> -{item.discount}%</Badge>
          ) : null}
        </div>
        <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-semibold">${item.price.toFixed(2)}</div>
          {item.oldPrice ? (
            <div className="text-sm line-through text-muted-foreground">${item.oldPrice.toFixed(2)}</div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-1">
        {item.features.slice(0, 4).map((f, i) => (
          <div key={i} className="flex items-center gap-2"><CheckCircle2 size={14}/> {f}</div>
        ))}
        <div className="text-xs">⚡ Delivery: {item.delivery}</div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onAdd(item)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export function SubscriptionCard({ plan, onAdd }) {
  return (
    <Card className={`relative ${plan.highlight ? "ring-2 ring-primary" : ""}`}>
      {plan.highlight && (
        <Badge className="absolute right-3 top-3" variant="secondary">Viral Package</Badge>
      )}
      <CardHeader>
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <div className="mt-1 text-sm text-muted-foreground">{plan.summary}</div>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-semibold">${plan.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {plan.features.map((f, i) => (
          <div key={i} className="flex items-center gap-2"><CheckCircle2 size={14}/> {f}</div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onAdd({ id: plan.id, title: plan.name + " Subscription", price: plan.price })}>{plan.cta || "Start Growing"}</Button>
      </CardFooter>
    </Card>
  );
}

export function WhyChoose() {
  const items = [
    { icon: Zap, title: "Instant Delivery", desc: "Orders start within minutes" },
    { icon: Users, title: "Real Users", desc: "Authentic, active accounts" },
    { icon: Shield, title: "Lifetime Guarantee", desc: "We replace drops for free" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((it) => (
        <Card key={it.title}>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 text-primary"><it.icon size={18}/> <span className="font-medium">{it.title}</span></div>
            <div className="text-sm text-muted-foreground">{it.desc}</div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export function PackagesTabs({ packages, onAdd }) {
  const categories = [
    { key: "instagram", label: "Instagram" },
    { key: "youtube", label: "YouTube" },
    { key: "facebook", label: "Facebook" },
    { key: "tiktok", label: "TikTok" },
    { key: "twitter", label: "Twitter" },
    { key: "telegram", label: "Telegram" },
    { key: "others", label: "Other Platforms" },
  ];
  return (
    <Tabs defaultValue="instagram" className="w-full">
      <TabsList className="flex flex-wrap">
        {categories.map((c) => (
          <TabsTrigger key={c.key} value={c.key}>{c.label}</TabsTrigger>
        ))}
      </TabsList>
      {categories.map((c) => (
        <TabsContent key={c.key} value={c.key} className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.filter((p) => p.platform === c.key).slice(0, 9).map((item) => (
              <ProductCard key={item.id} item={item} onAdd={onAdd} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function CartDrawer() {
  const { items, totals, remove, inc, dec, clear, open, setOpen } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{/* handled from header button */}</SheetTrigger>
        <SheetContent side="right" className="w-[380px] sm:w-[420px]">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex h-[70vh] flex-col">
            <div className="flex-1 space-y-3 overflow-auto pr-3">
              {items.length === 0 && (
                <div className="text-sm text-muted-foreground">Your cart is empty. Browse packages to boost your growth!</div>
              )}
              {items.map((it) => (
                <div key={it.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium leading-tight">{it.title}</div>
                      <div className="text-xs text-muted-foreground">${it.price?.toFixed(2)} • Qty {it.qty}</div>
                    </div>
                    <button onClick={() => remove(it.id)} className="text-xs text-muted-foreground hover:underline">Remove</button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => dec(it.id)}>-</Button>
                    <div className="text-sm w-6 text-center">{it.qty}</div>
                    <Button size="sm" variant="outline" onClick={() => inc(it.id)}>+</Button>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Total</div>
                <div className="font-semibold">${totals.amount.toFixed(2)}</div>
              </div>
              <Button className="w-full" disabled={items.length === 0} onClick={() => setCheckoutOpen(true)}>
                <CreditCard className="mr-2" size={16}/> Checkout
              </Button>
              {items.length > 0 && (
                <Button className="w-full" variant="outline" onClick={clear}>Clear Cart</Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} amount={totals.amount} />
    </>
  );
}

function CheckoutDialog({ open, onOpenChange, amount }) {
  const { clear } = useCart();
  const [method, setMethod] = useState("stripe");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Payment Method</Label>
            <RadioGroup value={method} onValueChange={setMethod} className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 rounded-md border p-2"><RadioGroupItem value="stripe" id="pm-stripe" /> <span>Stripe</span></label>
              <label className="flex items-center gap-2 rounded-md border p-2"><RadioGroupItem value="sslcommerz" id="pm-ssl" /> <span>SSLCommerz</span></label>
              <label className="flex items-center gap-2 rounded-md border p-2"><RadioGroupItem value="paypal" id="pm-pp" /> <span>PayPal</span></label>
              <label className="flex items-center gap-2 rounded-md border p-2"><RadioGroupItem value="cod" id="pm-cod" /> <span>Manual/UPI</span></label>
            </RadioGroup>
            <div className="text-xs text-muted-foreground">Configure gateways in Payments page to go live. This checkout is mocked.</div>
          </div>
          <div className="rounded-md border p-3 text-sm">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>${amount.toFixed(2)}</span></div>
            <div className="flex items-center justify-between"><span>Fees</span><span>$0.00</span></div>
            <div className="mt-2 flex items-center justify-between font-semibold"><span>Total</span><span>${amount.toFixed(2)}</span></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={() => { alert(`Mock payment via ${method} for $${amount.toFixed(2)}`); clear(); onOpenChange(false); }}>Pay (Mock)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}