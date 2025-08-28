import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { useCart } from "../context/CartContext";
import { hero, metrics, oneOffPackages, subscriptions, testimonials, blogPosts, faqs, platforms, defaultGateways } from "../mock/mock";
import { PackagesTabs, ProductCard, SubscriptionCard, WhyChoose } from "../components/CloneUI";
import { Star } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* ... rest of the file remains same until PaymentsPage ... */

export function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get(`${API}/payments/settings`);
        setSettings(data);
      } catch (e) {
        // fallback to local defaults
        setSettings({
          stripe: { enabled: false, data: { publishableKey: "", secretKey: "" } },
          sslcommerz: { enabled: false, data: { storeId: "", storePassword: "", sandbox: "true" } },
          paypal: { enabled: false, data: { clientId: "", secret: "", mode: "sandbox" } },
        });
      } finally { setLoading(false); }
    }
    load();
  }, []);

  const save = async (next) => {
    setSaving(true);
    try {
      const { data } = await axios.put(`${API}/payments/settings`, next);
      setSettings(data);
    } finally { setSaving(false); }
  };

  if (loading || !settings) return <main className="mx-auto max-w-4xl px-4 py-10">Loading...</main>;

  const Gate = ({ name, node, path }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Enabled</span>
            <Switch checked={node.enabled} onCheckedChange={(v) => save({ [path]: { enabled: v, data: node.data } })} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {Object.keys(node.data).map((k) => (
          <div key={k} className="grid gap-1">
            <Label>{k}</Label>
            <Input value={node.data[k]} onChange={(e) => save({ [path]: { enabled: node.enabled, data: { **node.data, [k]: e.target.value } } })} placeholder={`Enter ${k}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Payment Settings</h1>
      <p className="text-sm text-muted-foreground">Enable gateways and add keys. Changes save immediately. {saving ? "Saving..." : ""}</p>
      <div className="mt-6 grid gap-4">
        <Gate name="Stripe" node={settings.stripe || { enabled: false, data: { publishableKey: "", secretKey: "" } }} path="stripe" />
        <Gate name="SSLCommerz" node={settings.sslcommerz || { enabled: false, data: { storeId: "", storePassword: "", sandbox: "true" } }} path="sslcommerz" />
        <Gate name="PayPal" node={settings.paypal || { enabled: false, data: { clientId: "", secret: "", mode: "sandbox" } }} path="paypal" />
      </div>
      <div className="mt-6 text-sm text-muted-foreground">Note: Backend stores the settings in MongoDB. Live payment calls are enabled after keys are present (next phase we add real redirects + webhooks).</div>
    </main>
  );
}