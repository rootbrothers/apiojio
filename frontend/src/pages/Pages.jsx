import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { useCart } from "../context/CartContext";
import { hero, metrics, oneOffPackages, subscriptions, testimonials, blogPosts, faqs, platforms } from "../mock/mock";
import { PackagesTabs, ProductCard, SubscriptionCard, WhyChoose } from "../components/CloneUI";
import { CheckCircle2, Star } from "lucide-react";

export function HomePage() {
  const { add } = useCart();

  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-background to-accent/20">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{hero.title}</h1>
              <p className="mt-4 text-muted-foreground">{hero.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {hero.bullets.map((b) => (
                  <span key={b.label} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {b.label}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button asChild><Link to="/products">Browse Packages</Link></Button>
                <Button variant="secondary" asChild><Link to="/subscribe">Start Subscription</Link></Button>
              </div>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-sm">
                <Metric label="Orders Delivered" value={metrics.orders.toLocaleString()} />
                <Metric label="Success Rate" value={`${metrics.successRate}%`} />
                <Metric label="Platforms Supported" value={metrics.platforms} />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid gap-3">
                <PromoCard title="Instant Delivery" subtitle="Automated within minutes" />
                <PromoCard title="Multiple Payments" subtitle="Cards, PayPal, Crypto" />
                <PromoCard title="Lifetime Guarantee" subtitle="Free replacements" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages preview */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Choose Your Growth Plan</h2>
          <TabsList>
            <TabsTrigger value="packages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">One-Off</TabsTrigger>
            <TabsTrigger value="subs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Subscriptions</TabsTrigger>
          </TabsList>
        </div>
        <Tabs defaultValue="packages">
          <TabsContent value="packages">
            <PackagesTabs packages={oneOffPackages} onAdd={add} />
          </TabsContent>
          <TabsContent value="subs">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subscriptions.map((plan) => (
                <SubscriptionCard key={plan.id} plan={plan} onAdd={add} />)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Testimonials */}
      <section className="border-t bg-accent/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold tracking-tight">Real Success Stories</h2>
          <p className="text-sm text-muted-foreground">From customers who transformed their social media</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.handle}>
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{t.name}</div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{t.niche}</div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="text-muted-foreground">"{t.quote}"</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <Stat label="Before" value={t.before.toLocaleString()} />
                    <Stat label="Growth" value={t.growth} />
                    <Stat label="After" value={t.after.toLocaleString()} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6"><Button asChild variant="secondary"><Link to="/products#case-studies">View Case Studies</Link></Button></div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <WhyChoose />
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function PromoCard({ title, subtitle }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{subtitle}</CardContent>
    </Card>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-md border p-2">
      <div className="text-sm font-semibold">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

export function ProductsPage() {
  const { add } = useCart();
  const [searchParams] = useSearchParams();
  const platformParam = searchParams.get("platform");

  const grouped = useMemo(() => {
    const g = {};
    oneOffPackages.forEach((p) => {
      g[p.platform] = g[p.platform] || [];
      g[p.platform].push(p);
    });
    return g;
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Social Media Growth Packages</h1>
        <p className="text-sm text-muted-foreground">Premium Instagram, TikTok, YouTube, Twitter (X) & Facebook services with instant delivery.</p>
      </div>

      <div className="mb-6 rounded-md border bg-card p-4 text-sm">
        <strong className="mr-2">🔥 FLASH SALE:</strong> 90% OFF TikTok Views — Limited time only!
      </div>

      {platforms.map((p) => (
        <section key={p.key} id={p.key} className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ color: p.color }}>{p.name} Services</h2>
            <Button variant="secondary" asChild>
              <Link to={`/products?platform=${p.key}`}>View All</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(grouped[p.key] || []).slice(0, 6).map((item) => (
              <ProductCard key={item.id} item={item} onAdd={add} />
            ))}
          </div>
        </section>
      ))}

      {/* Case Studies */}
      <section id="case-studies" className="mt-16 border-t pt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Case Studies</h2>
        <p className="text-sm text-muted-foreground">Before/After snapshots from real customer journeys (mocked)</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <Card key={t.name}>
              <CardHeader>
                <CardTitle className="text-base">{t.name} • {t.niche}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div>Before</div>
                  <div className="font-semibold">{t.before.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>After</div>
                  <div className="font-semibold">{t.after.toLocaleString()}</div>
                </div>
                <div className="text-xs text-muted-foreground">Package: {t.package}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

export function SubscribePage() {
  const { add } = useCart();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <div className="mb-2 rounded-full border px-3 py-1 text-xs">Limited Time: 40% OFF All Plans</div>
        <h1 className="text-3xl font-semibold tracking-tight">Go Viral Every Post</h1>
        <p className="text-sm text-muted-foreground">Join 50,000+ influencers who use our monthly growth subscriptions to dominate Instagram's algorithm.</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((plan) => (
          <SubscriptionCard key={plan.id} plan={plan} onAdd={(p) => add(p)} />
        ))}
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[{t:"Subscribe & Setup",d:"Choose your plan and provide your IG handle. 30s setup."},{t:"Automatic Delivery",d:"Consistent followers and engagement delivered monthly."},{t:"Go Viral",d:"Watch posts hit Explore as the algorithm prioritizes you."}].map((s) => (
          <Card key={s.t}><CardHeader><CardTitle className="text-base">{s.t}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{s.d}</CardContent></Card>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}

export function FreeTestPage() {
  const [platform, setPlatform] = useState("instagram");
  const [handle, setHandle] = useState("");
  const [sample, setSample] = useState("likes");
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("free.tests") || "[]"); } catch { return []; }
  });

  const submit = () => {
    if (!handle) return alert("Please enter your profile link or username");
    const entry = { id: Date.now(), platform, handle, sample, ts: new Date().toISOString(), status: "Delivered (mock)" };
    const next = [entry, ...history];
    setHistory(next);
    localStorage.setItem("free.tests", JSON.stringify(next));
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Free Test</h1>
      <p className="text-sm text-muted-foreground">Try a small sample on us. No password required. Instant delivery.</p>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <Label>Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
            <SelectContent>
              {platforms.map((p) => (
                <SelectItem key={p.key} value={p.key}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Profile Link or @username</Label>
          <Input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="https://instagram.com/yourname or @yourname" />
        </div>
        <div className="grid gap-2">
          <Label>Sample Type</Label>
          <Select value={sample} onValueChange={setSample}>
            <SelectTrigger><SelectValue placeholder="Select sample" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="likes">Likes</SelectItem>
              <SelectItem value="followers">Followers</SelectItem>
              <SelectItem value="views">Views</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={submit}>Get Free Sample (Mock)</Button>
      </div>

      <Separator className="my-8" />
      <h2 className="text-xl font-semibold">Your Recent Free Tests</h2>
      <div className="mt-4 grid gap-3">
        {history.length === 0 && (
          <div className="text-sm text-muted-foreground">No free tests yet.</div>
        )}
        {history.map((h) => (
          <Card key={h.id}>
            <CardContent className="py-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-medium">{h.platform.toUpperCase()} • {h.sample}</div>
                  <div className="text-xs text-muted-foreground">{h.handle}</div>
                </div>
                <div className="text-xs">{new Date(h.ts).toLocaleString()}</div>
                <div className="text-xs text-green-600">{h.status}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function BlogPage() {
  const [openId, setOpenId] = useState(null);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="text-sm text-muted-foreground">Tips and strategies to grow faster.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {blogPosts.map((b) => (
          <Card key={b.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base">{b.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground flex-1">
              {b.excerpt}
            </CardContent>
            <div className="px-6 pb-4 text-xs text-muted-foreground">{b.author} • {b.date}</div>
            <div className="px-6 pb-6">
              <Button size="sm" variant="secondary" onClick={() => setOpenId(openId === b.id ? null : b.id)}>
                {openId === b.id ? "Hide" : "Read More"}
              </Button>
              {openId === b.id && (
                <div className="mt-3 text-sm">Full article content is mocked for now. We can wire CMS or markdown later.</div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(() => {
    try { return JSON.parse(localStorage.getItem("contact.submissions") || "[]"); } catch { return []; }
  });

  const submit = () => {
    if (!name || !email || !message) return alert("Please complete all fields");
    const entry = { id: Date.now(), name, email, message, ts: new Date().toISOString() };
    const next = [entry, ...sent];
    setSent(next);
    localStorage.setItem("contact.submissions", JSON.stringify(next));
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-sm text-muted-foreground">We typically respond within a few hours.</p>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Message</Label>
          <Textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <Button onClick={submit}>Send Message (Mock)</Button>
      </div>

      <Separator className="my-8" />
      <h2 className="text-xl font-semibold">Recent Messages</h2>
      <div className="mt-4 grid gap-3">
        {sent.length === 0 && <div className="text-sm text-muted-foreground">No messages yet.</div>}
        {sent.map((s) => (
          <Card key={s.id}>
            <CardContent className="py-4 text-sm">
              <div className="flex items-center justify-between">
                <div className="font-medium">{s.name} • {s.email}</div>
                <div className="text-xs text-muted-foreground">{new Date(s.ts).toLocaleString()}</div>
              </div>
              <div className="mt-2 text-muted-foreground">{s.message}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}