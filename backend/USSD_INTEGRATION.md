# SmartDuka Backend - USSD Integration Setup

## Overview
The SmartDuka backend now includes full Africa's Talking USSD integration. All USSD operations (Sales, Expenses, Debts, Stock, Cash Float) are connected to the DRF API endpoints.

## Folder Structure

```
backend/
├── smartduka_backend/        # Main Django project settings
│   ├── settings.py          # Django configuration (includes AT credentials)
│   ├── urls.py              # URL routing (includes USSD routes)
│   ├── wsgi.py
│   └── asgi.py
├── core/                     # Core app with DRF models and APIs
│   ├── models.py            # Sale, Expense, StockItem, Debt, CashFloatTransaction
│   ├── serializers.py       # DRF serializers
│   ├── views.py             # DRF viewsets
│   ├── urls.py              # API routes (/api/...)
│   └── admin.py             # Django admin configuration
├── ussd/                     # USSD app (formerly in smartduka-at)
│   ├── views.py             # USSD entry point and handlers
│   ├── urls.py              # USSD routes (/ussd/...)
│   ├── models.py
│   └── migrations/
├── manage.py                # Django CLI
├── db.sqlite3               # SQLite database
├── .env                     # Environment variables
└── requirements.txt         # Python dependencies
```

## Africa's Talking USSD Configuration

### Credentials
Stored in `backend/.env`:
```
AFRICASTALKING_USERNAME=SmartDuka
AFRICASTALKING_API_KEY=atsk_5d3c6f7b7f0755c84203cf8ba474cf20bdfba5fd7a3d73a9543bc5a602713a5593040b5a
API_BASE_URL=http://127.0.0.1:8000
```

### USSD Endpoint
**URL:** `http://127.0.0.1:8000/ussd/ussd/`  
**Method:** POST  
**Parameters:**
- `sessionId`: Session ID from Africa's Talking
- `serviceCode`: Service code (from AT)
- `phoneNumber`: Customer phone number
- `text`: Menu selection input (e.g., "1", "1*Rice*10*500")

### USSD Menu Structure
```
1. Record Sale         → Item name → Quantity → Price → Save to /api/sales/
2. Record Expense      → Description → Amount → Save to /api/expenses/
3. Update Cash Float   → Amount → Save to /api/cashfloat/
4. Check Stock         → Fetch from /api/stock/
5. View Summary        → Fetch all data and calculate profit
6. Track Debts
   6.1 Add Debt        → Name → Amount → Phone → Save to /api/debts/
   6.2 View Debts      → Fetch from /api/debts/
7. Upload Receipt      → (Placeholder for future)
```

## Integration Changes

### Backend Settings (`smartduka_backend/settings.py`)
- ✅ Added `'ussd'` to `INSTALLED_APPS`
- ✅ Added Africa's Talking credentials from environment variables
- ✅ Added `API_BASE_URL` for internal API calls

### Backend URLs (`smartduka_backend/urls.py`)
- ✅ Added `path('ussd/', include('ussd.urls'))` to route USSD requests

### USSD Views (`ussd/views.py`)
- ✅ Replaced in-memory database with DRF API calls
- ✅ All operations now POST/GET to `/api/` endpoints
- ✅ Added session state management for multi-step menus
- ✅ Added phone number support for debts

### Data Flow
```
Africa's Talking → POST /ussd/ussd/ → USSD handler 
                                    ↓
                            Validate input & session
                                    ↓
                    Call DRF API endpoints (/api/...)
                                    ↓
                          Return USSD response to AT
```

## Running the Backend

### 1. Start Development Server
```bash
cd /home/frank/smartduka
source .venv/bin/activate

# Option A: Run with migrations
python backend/manage.py migrate
python backend/manage.py runserver 0.0.0.0:8000

# Option B: Quick start (if DB exists)
python backend/manage.py runserver 0.0.0.0:8000
```

### 2. Verify Integration
Check that both APIs work:
```bash
# API endpoints
curl http://127.0.0.1:8000/api/debts/
curl http://127.0.0.1:8000/api/sales/
curl http://127.0.0.1:8000/api/expenses/
curl http://127.0.0.1:8000/api/stock/
curl http://127.0.0.1:8000/api/cashfloat/

# USSD endpoint (POST required)
curl -X POST http://127.0.0.1:8000/ussd/ussd/ \
  -d "sessionId=1&phoneNumber=+254712345678&text="
```

### 3. Django Admin
Access at `http://127.0.0.1:8000/admin/` to:
- View all sales, expenses, debts, stock, and cash float records
- Manage data directly
- Create/edit/delete records

## Python Dependencies

Installed in `.venv`:
- `django==6.0.1`
- `djangorestframework`
- `django-cors-headers`
- `python-dotenv`
- `requests` (for USSD API calls)

Install new deps: `pip install -r requirements.txt`

## API Endpoints Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/sales/` | GET, POST | List/create sales |
| `/api/expenses/` | GET, POST | List/create expenses |
| `/api/stock/` | GET, POST | List/create stock items |
| `/api/debts/` | GET, POST, PATCH, DELETE | List/create/update/delete debts |
| `/api/cashfloat/` | GET, POST | List/create cash float transactions |
| `/ussd/ussd/` | POST | Africa's Talking USSD webhook |

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DJANGO_SECRET_KEY` | Django security key | (auto-generated) |
| `DJANGO_DEBUG` | Debug mode | `True` (dev only) |
| `DJANGO_ALLOWED_HOSTS` | Allowed domains | `localhost,127.0.0.1` |
| `AFRICASTALKING_USERNAME` | AT account username | `SmartDuka` |
| `AFRICASTALKING_API_KEY` | AT API key | (from AT dashboard) |
| `API_BASE_URL` | Internal API URL | `http://127.0.0.1:8000` |

## What Was Deleted

The `smartduka-at` folder was removed after successful integration into the main backend. All functionality has been consolidated into:
- `backend/ussd/` - USSD application
- `backend/smartduka_backend/settings.py` - Africa's Talking configuration
- `backend/smartduka_backend/urls.py` - USSD routing

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] DRF API endpoints return data at `/api/sales/`, `/api/debts/`, etc.
- [ ] USSD endpoint at `/ussd/ussd/` accepts POST requests
- [ ] Adding debts via USSD stores phone numbers
- [ ] Frontend can still communicate with backend
- [ ] Django admin shows all records from both APIs and USSD

## Next Steps

1. **Connect Africa's Talking webhook**: Update AT settings to point to your deployment URL
2. **Add authentication**: Implement token-based auth if needed
3. **Optimize USSD responses**: Add caching for frequently accessed data
4. **Error handling**: Add logging and better error messages for AT service
5. **Production deployment**: Use Gunicorn/uWSGI instead of development server

## Troubleshooting

### USSD requests return 404
- Ensure `'ussd'` is in `INSTALLED_APPS`
- Verify URL routing includes `path('ussd/', include('ussd.urls'))`

### API calls from USSD fail
- Check `API_BASE_URL` in settings and `.env`
- Ensure DRF API endpoints are running
- Verify CORS is enabled for internal calls

### Africa's Talking connection issues
- Verify credentials in `.env` are correct
- Check network connectivity to AT servers
- Review AT documentation for USSD format requirements
