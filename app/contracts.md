# API Contracts for PopularSMM Clone

Status: v0.1 (frontend mostly mocked). This file defines contracts for moving to full-stack with FastAPI + MongoDB and payment integrations.

## Scope (Phase 1)
- Payment Settings (Stripe, SSLCommerz, PayPal) CRUD
- Checkout Session creation (returns redirect URL or mock if not configured)
- Preserve existing mocked catalog on frontend; products DB to be added in Phase 2

## Collections (MongoDB)
- payment_settings (singleton)
```json
{
  "_id": "settings",
  "stripe": {"enabled": false, "data": {"publishableKey": "", "secretKey": ""}},
  "sslcommerz": {"enabled": false, "data": {"storeId": "", "storePassword": "", "sandbox": "true"}},
  "paypal": {"enabled": false, "data": {"clientId": "", "secret": "", "mode": "sandbox"}},
  "created_at": "2025-07-28T00:00:00Z",
  "updated_at": "2025-07-28T00:00:00Z"
}
```

- orders (Phase 2)
- products (Phase 2)

## Endpoints (/api prefix required)

### GET /api/payments/settings
- Response 200:
```json
{
  "stripe": {"enabled": false, "data": {"publishableKey": "", "secretKey": ""}},
  "sslcommerz": {"enabled": false, "data": {"storeId": "", "storePassword": "", "sandbox": "true"}},
  "paypal": {"enabled": false, "data": {"clientId": "", "secret": "", "mode": "sandbox"}}
}
```

### PUT /api/payments/settings
- Body:
```json
{
  "stripe": {"enabled": true, "data": {"publishableKey": "pk_...", "secretKey": "sk_..."}},
  "sslcommerz": {"enabled": false, "data": {"storeId": "", "storePassword": "", "sandbox": "true"}},
  "paypal": {"enabled": false, "data": {"clientId": "", "secret": "", "mode": "sandbox"}}
}
```
- Response 200: same as GET

### POST /api/checkout/session
- Body:
```json
{
  "items": [{"id":"ig-f-1k-ind","title":"1K Instagram Followers (India)","price":4.99,"qty":2}],
  "method": "stripe|sslcommerz|paypal|cod",
  "currency": "INR|USD",
  "success_url": "https://your.site/success",
  "cancel_url": "https://your.site/cancel"
}
```
- Response 200 (configured):
```json
{"status":"redirect","method":"stripe","redirect_url":"https://checkout.stripe.com/...","amount":9.98}
```
- Response 200 (not configured):
```json
{"status":"not_configured","method":"stripe","message":"Gateway not configured. Add keys in /payments.","amount":9.98}
```
- Response 200 (mock/manual):
```json
{"status":"mock","method":"cod","message":"Manual/UPI selected. No online payment required.","amount":9.98}
```

## Frontend Mapping
- src/pages/Payments.jsx uses these endpoints to read/save gateway config
- CheckoutDialog (in CloneUI.jsx) calls POST /api/checkout/session; if redirect_url present -> window.location.href; else show toast

## What is still mocked
- Catalog/products & pricing (src/mock/mock.js)
- Blog content, testimonials, case studies

## Backend TODO (Phase 2)
- Products collection + CRUD
- Orders collection + status webhooks for Stripe/PayPal/SSLCommerz
- Auth (admin) for securing Payment Settings

## Integration Notes
- Stripe: Create PaymentIntent/Checkout Session on server when secretKey present
- SSLCommerz: Initiate payment via create Session API and redirect to GatewayPageURL
- PayPal: Create Order v2 and redirect to approve link
- All webhooks update Orders collection (not in Phase 1)