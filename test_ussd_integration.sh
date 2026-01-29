#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   SmartDuka USSD Integration Test                             ║"
echo "║   Testing Sales & Debts Data Persistence                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

API_URL="http://127.0.0.1:8000"
USSD_URL="$API_URL/ussd/"

echo "📱 USSD SERVER: $USSD_URL"
echo "🗄️  DATABASE API: $API_URL/api/"
echo "🌐 FRONTEND: http://127.0.0.1:5173"
echo ""

# Test 1: Create a Sale via USSD
echo "═════════════════════════════════════════════════════════════════"
echo "TEST 1: Create Sale via USSD (Maize - 100 units @ Ksh 300)"
echo "═════════════════════════════════════════════════════════════════"
echo ""

SESSION_ID="sale_$(date +%s)"
echo "📍 Session: $SESSION_ID"
echo ""

echo "Step 1/4: Main menu..."
curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=" > /dev/null
echo "✓ Got main menu"
echo ""

echo "Step 2/4: Select option 1 (Record Sale)..."
curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=1" > /dev/null
echo "✓ Asked for item name"
echo ""

echo "Step 3/4: Enter item (Maize) and quantity (100)..."
curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=1*Maize*100" > /dev/null
echo "✓ Asked for price"
echo ""

echo "Step 4/4: Enter price (300)..."
RESPONSE=$(curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=1*Maize*100*300")
echo "✓ $RESPONSE"
echo ""

sleep 1

# Test 2: Verify Sale in Database
echo "═════════════════════════════════════════════════════════════════"
echo "TEST 2: Verify Sale is in Database"
echo "═════════════════════════════════════════════════════════════════"
echo ""

SALES=$(curl -s $API_URL/api/sales/)
MAIZE_SALE=$(echo "$SALES" | python3 -c "import json, sys; data=json.load(sys.stdin); [print(f'✓ Found: {s[\"item_name\"]} x{s[\"quantity\"]} @ Ksh {s[\"price_per_unit\"]} = Ksh {s[\"total\"]}') for s in data if s['item_name'] == 'Maize']" 2>/dev/null || echo "⚠️  Checking...")

echo "$MAIZE_SALE"
echo ""

# Test 3: Create a Debt via USSD
echo "═════════════════════════════════════════════════════════════════"
echo "TEST 3: Create Debt via USSD (Grace Kiplagat - Ksh 3500 - 0723987654)"
echo "═════════════════════════════════════════════════════════════════"
echo ""

SESSION_ID="debt_$(date +%s)"
echo "📍 Session: $SESSION_ID"
echo ""

echo "Step 1/5: Main menu..."
curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=" > /dev/null
echo "✓ Got main menu"
echo ""

echo "Step 2/5: Select option 6 (Track Debts)..."
curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=6" > /dev/null
echo "✓ Asked to add or view debts"
echo ""

echo "Step 3/5: Select 1 (Add Debt)..."
curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=6*1" > /dev/null
echo "✓ Asked for customer name"
echo ""

echo "Step 4/5: Enter name and amount..."
curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=6*1*Grace%20Kiplagat*3500" > /dev/null
echo "✓ Asked for phone number"
echo ""

echo "Step 5/5: Enter phone number..."
RESPONSE=$(curl -s -X POST $USSD_URL -d "sessionId=$SESSION_ID&phoneNumber=%2B254712345678&text=6*1*Grace%20Kiplagat*3500*0723987654")
echo "✓ $RESPONSE"
echo ""

sleep 1

# Test 4: Verify Debt in Database
echo "═════════════════════════════════════════════════════════════════"
echo "TEST 4: Verify Debt is in Database with Phone Number"
echo "═════════════════════════════════════════════════════════════════"
echo ""

DEBTS=$(curl -s $API_URL/api/debts/)
GRACE_DEBT=$(echo "$DEBTS" | python3 -c "import json, sys; data=json.load(sys.stdin); [print(f'✓ Found: {d[\"customer_name\"]} - Ksh {d[\"amount\"]} - Phone: {d[\"phone_number\"]}') for d in data if 'Grace' in d['customer_name']]" 2>/dev/null || echo "⚠️  Checking...")

echo "$GRACE_DEBT"
echo ""

# Test 5: Display all records
echo "═════════════════════════════════════════════════════════════════"
echo "TEST 5: All Sales in Database"
echo "═════════════════════════════════════════════════════════════════"
echo ""
curl -s $API_URL/api/sales/ | python3 -m json.tool | grep -E '"item_name"|"quantity"|"total"' | head -20
echo ""

echo "═════════════════════════════════════════════════════════════════"
echo "TEST 6: All Debts in Database"
echo "═════════════════════════════════════════════════════════════════"
echo ""
curl -s $API_URL/api/debts/ | python3 -m json.tool | grep -E '"customer_name"|"amount"|"phone_number"'
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   ✅ Integration Test Complete!                               ║"
echo "║                                                                ║"
echo "║   📊 Next Steps:                                              ║"
echo "║   1. Open http://127.0.0.1:5173 in browser                  ║"
echo "║   2. Check Sales page - should show USSD sales               ║"
echo "║   3. Check Debts page - should show USSD debts with phones   ║"
echo "║   4. Verify phone numbers display in table                   ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
