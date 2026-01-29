import requests
import json
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings

# Store user session state temporarily (could use cache or database for production)
user_sessions = {}

API_BASE = getattr(settings, 'API_BASE_URL', 'http://127.0.0.1:8000')

def fetch_sales():
    """Fetch sales from DRF API"""
    try:
        response = requests.get(f'{API_BASE}/api/sales/')
        if response.status_code == 200:
            return response.json()
    except:
        pass
    return []

def fetch_expenses():
    """Fetch expenses from DRF API"""
    try:
        response = requests.get(f'{API_BASE}/api/expenses/')
        if response.status_code == 200:
            return response.json()
    except:
        pass
    return []

def fetch_stock():
    """Fetch stock from DRF API"""
    try:
        response = requests.get(f'{API_BASE}/api/stock/')
        if response.status_code == 200:
            return response.json()
    except:
        pass
    return []

def fetch_debts():
    """Fetch debts from DRF API"""
    try:
        response = requests.get(f'{API_BASE}/api/debts/')
        if response.status_code == 200:
            return response.json()
    except:
        pass
    return []

def fetch_cash_float():
    """Fetch cash float from DRF API"""
    try:
        response = requests.get(f'{API_BASE}/api/cashfloat/')
        if response.status_code == 200:
            data = response.json()
            total = sum(float(item.get('amount', 0)) for item in data)
            return total
    except:
        pass
    return 0

def post_sale(item_name, quantity, price_per_unit):
    """Post sale to DRF API"""
    try:
        payload = {
            'item_name': item_name,
            'quantity': int(quantity),
            'price_per_unit': float(price_per_unit),
            'total': float(quantity) * float(price_per_unit),
        }
        response = requests.post(f'{API_BASE}/api/sales/', json=payload)
        return response.status_code == 201
    except:
        return False

def post_expense(expense_type, amount, notes=''):
    """Post expense to DRF API"""
    try:
        from datetime import date
        payload = {
            'type': expense_type,
            'amount': float(amount),
            'notes': notes,
            'date': str(date.today()),
        }
        response = requests.post(f'{API_BASE}/api/expenses/', json=payload)
        return response.status_code == 201
    except:
        return False

def post_debt(customer_name, amount, phone_number='', notes=''):
    """Post debt to DRF API"""
    try:
        payload = {
            'customer_name': customer_name,
            'phone_number': phone_number,
            'amount': float(amount),
            'notes': notes,
        }
        response = requests.post(f'{API_BASE}/api/debts/', json=payload)
        return response.status_code == 201
    except:
        return False

def post_cash_float(action, amount, notes=''):
    """Post cash float transaction to DRF API"""
    try:
        from datetime import date
        payload = {
            'action': action,
            'amount': float(amount),
            'notes': notes,
            'date': str(date.today()),
        }
        response = requests.post(f'{API_BASE}/api/cashfloat/', json=payload)
        return response.status_code == 201
    except:
        return False

@csrf_exempt
@require_http_methods(["POST"])
def ussd_entry(request):
    """
    SmartDuka USSD Entry Point for Africa's Talking
    POST parameters: sessionId, serviceCode, phoneNumber, text
    """
    session_id = request.POST.get('sessionId')
    phone_number = request.POST.get('phoneNumber')
    text = request.POST.get('text', '')  # e.g., "1*Rice*2*500"

    user_input = text.split('*') if text else []
    
    # Store user session state
    if session_id not in user_sessions:
        user_sessions[session_id] = {'phone': phone_number, 'step': 0, 'data': {}}

    session = user_sessions[session_id]

    # --- Main Menu ---
    if len(user_input) == 0:
        session['step'] = 0
        response = "CON Welcome to SmartDuka\n"
        response += "1. Record Sale\n"
        response += "2. Record Expense\n"
        response += "3. Update Cash Float\n"
        response += "4. Check Stock\n"
        response += "5. View Summary\n"
        response += "6. Track Debts\n"
        response += "7. Upload Receipt (placeholder)"
        return HttpResponse(response, content_type='text/plain')

    # --- Record Sale ---
    if user_input[0] == '1':
        if len(user_input) == 1:
            return HttpResponse("CON Enter Item Name:", content_type='text/plain')
        elif len(user_input) == 2:
            session['data']['item'] = user_input[1]
            return HttpResponse("CON Enter Quantity:", content_type='text/plain')
        elif len(user_input) == 3:
            session['data']['quantity'] = user_input[2]
            return HttpResponse("CON Enter Price per Unit (Ksh):", content_type='text/plain')
        elif len(user_input) == 4:
            item = session['data'].get('item', user_input[1])
            qty = session['data'].get('quantity', user_input[2])
            price = user_input[3]
            
            if post_sale(item, qty, price):
                return HttpResponse(f"END Sale recorded: {qty} x {item} @ Ksh {price}", content_type='text/plain')
            else:
                return HttpResponse(f"END Sale failed. Please try again.", content_type='text/plain')

    # --- Record Expense ---
    if user_input[0] == '2':
        if len(user_input) == 1:
            return HttpResponse("CON Enter Expense Description:", content_type='text/plain')
        elif len(user_input) == 2:
            session['data']['expense_desc'] = user_input[1]
            return HttpResponse("CON Enter Amount (Ksh):", content_type='text/plain')
        elif len(user_input) == 3:
            desc = session['data'].get('expense_desc', user_input[1])
            amount = user_input[2]
            
            if post_expense(desc, amount):
                return HttpResponse(f"END Expense recorded: {desc} @ Ksh {amount}", content_type='text/plain')
            else:
                return HttpResponse(f"END Expense failed. Please try again.", content_type='text/plain')

    # --- Update Cash Float ---
    if user_input[0] == '3':
        if len(user_input) == 1:
            return HttpResponse("CON Enter Amount to Add or Deduct:\n(e.g., 1000 for add, -500 for deduct)", content_type='text/plain')
        elif len(user_input) == 2:
            amount = user_input[1]
            action = 'add' if int(amount) > 0 else 'deduct'
            
            if post_cash_float(action, abs(int(amount))):
                current = fetch_cash_float()
                return HttpResponse(f"END Cash float updated. Current: Ksh {current}", content_type='text/plain')
            else:
                return HttpResponse(f"END Update failed. Please try again.", content_type='text/plain')

    # --- Check Stock ---
    if user_input[0] == '4':
        stock = fetch_stock()
        if stock:
            stock_list = "\n".join([f"{item['item_name']}: {item['quantity']}" for item in stock])
            return HttpResponse(f"END Current Stock:\n{stock_list}", content_type='text/plain')
        else:
            return HttpResponse("END No stock data available.", content_type='text/plain')

    # --- View Summary ---
    if user_input[0] == '5':
        sales = fetch_sales()
        expenses = fetch_expenses()
        cash = fetch_cash_float()
        
        total_sales = sum(float(s.get('total', 0)) for s in sales)
        total_expenses = sum(float(e.get('amount', 0)) for e in expenses)
        profit = total_sales - total_expenses
        
        return HttpResponse(
            f"END Summary:\nSales: Ksh {int(total_sales)}\nExpenses: Ksh {int(total_expenses)}\nProfit: Ksh {int(profit)}\nCash: Ksh {int(cash)}",
            content_type='text/plain'
        )

    # --- Debt Tracker ---
    if user_input[0] == '6':
        if len(user_input) == 1:
            return HttpResponse("CON 1. Add Debt\n2. View Debts", content_type='text/plain')
        elif user_input[1] == '1':
            if len(user_input) == 2:
                return HttpResponse("CON Enter Customer Name:", content_type='text/plain')
            elif len(user_input) == 3:
                session['data']['debt_customer'] = user_input[2]
                return HttpResponse("CON Enter Amount Owed (Ksh):", content_type='text/plain')
            elif len(user_input) == 4:
                session['data']['debt_amount'] = user_input[3]
                return HttpResponse("CON Enter Phone Number (optional, press 0 to skip):", content_type='text/plain')
            elif len(user_input) == 5:
                customer = session['data'].get('debt_customer', user_input[2])
                amount = session['data'].get('debt_amount', user_input[3])
                phone = user_input[4] if user_input[4] != '0' else ''
                
                if post_debt(customer, amount, phone):
                    return HttpResponse(f"END Debt recorded for {customer}: Ksh {amount}", content_type='text/plain')
                else:
                    return HttpResponse(f"END Debt recording failed. Please try again.", content_type='text/plain')
        elif user_input[1] == '2':
            debts = fetch_debts()
            if debts:
                debt_list = "\n".join([f"{d['customer_name']}: Ksh {d['amount']}" for d in debts])
                return HttpResponse(f"END Debts:\n{debt_list}", content_type='text/plain')
            else:
                return HttpResponse("END No debts recorded.", content_type='text/plain')

    # --- Receipts Upload Placeholder ---
    if user_input[0] == '7':
        return HttpResponse("END Receipts upload feature coming soon", content_type='text/plain')

    # --- Invalid Option ---
    return HttpResponse("END Invalid Option", content_type='text/plain')

