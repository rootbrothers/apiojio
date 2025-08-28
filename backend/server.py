from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Payment models
class Gateway(BaseModel):
    enabled: bool = False
    data: Dict[str, str] = Field(default_factory=dict)

class PaymentSettings(BaseModel):
    id: str = Field(default="settings")
    stripe: Gateway = Field(default_factory=Gateway)
    sslcommerz: Gateway = Field(default_factory=Gateway)
    paypal: Gateway = Field(default_factory=Gateway)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class GatewaySettingsUpdate(BaseModel):
    stripe: Optional[Gateway] = None
    sslcommerz: Optional[Gateway] = None
    paypal: Optional[Gateway] = None

class CheckoutItem(BaseModel):
    id: str
    title: str
    price: float
    qty: int

class CheckoutRequest(BaseModel):
    items: List[CheckoutItem]
    method: str
    currency: Optional[str] = "USD"
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# ---------------------- Payments ----------------------
DEFAULT_SETTINGS = PaymentSettings().model_dump()

async def _get_payment_settings() -> PaymentSettings:
    doc = await db.payment_settings.find_one({"_id": "settings"})
    if not doc:
        await db.payment_settings.insert_one({"_id": "settings", **DEFAULT_SETTINGS})
        doc = await db.payment_settings.find_one({"_id": "settings"})
    # convert Mongo _id storage into model
    payload = {k: v for k, v in doc.items() if k != "_id"}
    return PaymentSettings(**payload)

@api_router.get("/payments/settings", response_model=PaymentSettings)
async def get_payment_settings():
    return await _get_payment_settings()

@api_router.put("/payments/settings", response_model=PaymentSettings)
async def put_payment_settings(update: GatewaySettingsUpdate):
    current = await _get_payment_settings()
    data = current.model_dump()
    upd = update.model_dump(exclude_unset=True)
    for k, v in upd.items():
        if isinstance(v, dict):
            data[k].update(v)
        else:
            data[k] = v
    data["updated_at"] = datetime.utcnow()
    await db.payment_settings.update_one({"_id": "settings"}, {"$set": data}, upsert=True)
    return await _get_payment_settings()

@api_router.post("/checkout/session")
async def create_checkout_session(req: CheckoutRequest):
    settings = await _get_payment_settings()
    amount = sum([i.price * i.qty for i in req.items])
    method = req.method.lower()

    if method == "cod":
        return {"status": "mock", "method": method, "message": "Manual/UPI selected. No online payment required.", "amount": round(amount, 2)}

    # Check configuration availability without making external calls (Phase 1)
    gw = getattr(settings, method, None)
    if gw is None:
        raise HTTPException(status_code=400, detail="Unsupported payment method")

    # Required keys map (minimal)
    required_keys = {
        "stripe": ["secretKey"],
        "sslcommerz": ["storeId", "storePassword"],
        "paypal": ["clientId", "secret"],
    }
    keys_needed = required_keys.get(method, [])
    configured = gw.enabled and all(gw.data.get(k) for k in keys_needed)

    if not configured:
        return {
            "status": "not_configured",
            "method": method,
            "message": "Gateway not configured. Add keys in /payments page.",
            "amount": round(amount, 2),
        }

    # Phase 1 placeholder: do not call external services yet
    # We will implement real creation in Phase 2 once keys are provided.
    return {
        "status": "placeholder",
        "method": method,
        "message": "Integration scaffold ready. Add keys and we will enable live redirect.",
        "amount": round(amount, 2),
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()