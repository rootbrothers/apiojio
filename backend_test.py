#!/usr/bin/env python3
"""
Backend API Testing Script
Tests payment settings and checkout session endpoints
"""

import requests
import json
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
frontend_env_path = Path(__file__).parent / 'frontend' / '.env'
load_dotenv(frontend_env_path)

# Get backend URL from environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in environment")
    exit(1)

print(f"🔗 Testing backend at: {BACKEND_URL}")

def test_hello_world():
    """Test GET /api/ returns Hello World"""
    print("\n📋 Testing GET /api/ - Hello World endpoint")
    try:
        response = requests.get(f"{BACKEND_URL}/api/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Hello World endpoint working correctly")
                return True
            else:
                print(f"❌ Expected 'Hello World', got: {data.get('message')}")
                return False
        else:
            print(f"❌ Expected status 200, got: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing hello world endpoint: {e}")
        return False

def test_get_payment_settings():
    """Test GET /api/payments/settings initializes and returns default settings"""
    print("\n📋 Testing GET /api/payments/settings - Default settings initialization")
    try:
        response = requests.get(f"{BACKEND_URL}/api/payments/settings")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            # Check if it has the expected structure
            required_gateways = ['stripe', 'sslcommerz', 'paypal']
            if all(gateway in data for gateway in required_gateways):
                print("✅ Payment settings endpoint working - has all required gateways")
                # Check structure of each gateway
                for gateway in required_gateways:
                    gateway_data = data[gateway]
                    if 'enabled' in gateway_data and 'data' in gateway_data:
                        print(f"  ✅ {gateway} has correct structure")
                    else:
                        print(f"  ❌ {gateway} missing 'enabled' or 'data' fields")
                        return False
                return True
            else:
                missing = [g for g in required_gateways if g not in data]
                print(f"❌ Missing gateways: {missing}")
                return False
        else:
            print(f"❌ Expected status 200, got: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing payment settings endpoint: {e}")
        return False

def test_update_payment_settings():
    """Test PUT /api/payments/settings updates stripe settings"""
    print("\n📋 Testing PUT /api/payments/settings - Update stripe settings")
    try:
        # Update stripe settings
        update_data = {
            "stripe": {
                "enabled": True,
                "data": {
                    "publishableKey": "pk_test_123456789",
                    "secretKey": "sk_test_987654321"
                }
            }
        }
        
        response = requests.put(
            f"{BACKEND_URL}/api/payments/settings",
            json=update_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            stripe_data = data.get('stripe', {})
            if (stripe_data.get('enabled') == True and 
                stripe_data.get('data', {}).get('publishableKey') == "pk_test_123456" and
                stripe_data.get('data', {}).get('secretKey') == "sk_test_987654321"):
                print("✅ Stripe settings updated successfully")
                return True
            else:
                print("❌ Stripe settings not updated correctly")
                return False
        else:
            print(f"❌ Expected status 200, got: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error updating payment settings: {e}")
        return False

def test_get_updated_settings():
    """Test GET /api/payments/settings reflects the updates"""
    print("\n📋 Testing GET /api/payments/settings - Verify updates persisted")
    try:
        response = requests.get(f"{BACKEND_URL}/api/payments/settings")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            stripe_data = data.get('stripe', {})
            if (stripe_data.get('enabled') == True and 
                stripe_data.get('data', {}).get('publishableKey') == "pk_test_123456" and
                stripe_data.get('data', {}).get('secretKey') == "sk_test_987654321"):
                print("✅ Updated stripe settings persisted correctly")
                return True
            else:
                print("❌ Updated settings not persisted")
                print(f"Stripe data: {stripe_data}")
                return False
        else:
            print(f"❌ Expected status 200, got: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error verifying updated settings: {e}")
        return False

def test_checkout_session_stripe_configured():
    """Test POST /api/checkout/session with stripe method when configured"""
    print("\n📋 Testing POST /api/checkout/session - Stripe method (configured)")
    try:
        checkout_data = {
            "items": [
                {
                    "id": "item_1",
                    "title": "Premium Social Media Package",
                    "price": 99.99,
                    "qty": 1
                },
                {
                    "id": "item_2", 
                    "title": "Analytics Dashboard Access",
                    "price": 29.99,
                    "qty": 2
                }
            ],
            "method": "stripe",
            "currency": "USD",
            "success_url": "https://example.com/success",
            "cancel_url": "https://example.com/cancel"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/api/checkout/session",
            json=checkout_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'placeholder' and data.get('method') == 'stripe':
                print("✅ Stripe checkout session returns placeholder status when configured")
                return True
            else:
                print(f"❌ Expected status='placeholder', got: {data.get('status')}")
                return False
        else:
            print(f"❌ Expected status 200, got: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing stripe checkout session: {e}")
        return False

def test_checkout_session_cod():
    """Test POST /api/checkout/session with COD method"""
    print("\n📋 Testing POST /api/checkout/session - COD method")
    try:
        checkout_data = {
            "items": [
                {
                    "id": "item_1",
                    "title": "Basic Social Media Package",
                    "price": 49.99,
                    "qty": 1
                }
            ],
            "method": "cod",
            "currency": "USD"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/api/checkout/session",
            json=checkout_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'mock' and data.get('method') == 'cod':
                print("✅ COD checkout session returns mock status correctly")
                return True
            else:
                print(f"❌ Expected status='mock', got: {data.get('status')}")
                return False
        else:
            print(f"❌ Expected status 200, got: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing COD checkout session: {e}")
        return False

def test_checkout_session_unconfigured():
    """Test POST /api/checkout/session with unconfigured payment method"""
    print("\n📋 Testing POST /api/checkout/session - Unconfigured payment method")
    try:
        # First, disable stripe to test unconfigured scenario
        update_data = {
            "stripe": {
                "enabled": False,
                "data": {}
            }
        }
        
        requests.put(
            f"{BACKEND_URL}/api/payments/settings",
            json=update_data,
            headers={"Content-Type": "application/json"}
        )
        
        # Now test checkout with disabled stripe
        checkout_data = {
            "items": [
                {
                    "id": "item_1",
                    "title": "Test Product",
                    "price": 10.00,
                    "qty": 1
                }
            ],
            "method": "stripe"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/api/checkout/session",
            json=checkout_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'not_configured' and data.get('method') == 'stripe':
                print("✅ Unconfigured stripe returns not_configured status correctly")
                return True
            else:
                print(f"❌ Expected status='not_configured', got: {data.get('status')}")
                return False
        else:
            print(f"❌ Expected status 200, got: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing unconfigured checkout session: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests")
    print("=" * 50)
    
    tests = [
        ("Hello World Endpoint", test_hello_world),
        ("Get Payment Settings", test_get_payment_settings),
        ("Update Payment Settings", test_update_payment_settings),
        ("Verify Settings Persisted", test_get_updated_settings),
        ("Checkout Session - Stripe Configured", test_checkout_session_stripe_configured),
        ("Checkout Session - COD", test_checkout_session_cod),
        ("Checkout Session - Unconfigured", test_checkout_session_unconfigured),
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ Test '{test_name}' failed with exception: {e}")
            results.append((test_name, False))
    
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed!")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)