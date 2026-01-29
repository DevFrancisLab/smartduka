# Backend (Django)

This folder contains a minimal Django project scaffold for the SmartDuka backend.

Quick start (Linux/macOS):

```bash
# 1. Enter the backend folder
cd backend

# 2. Create a virtual environment (recommended)
python3 -m venv .venv
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Apply migrations
python manage.py migrate

# 5. (Optional) Create a superuser for the admin
python manage.py createsuperuser

# 6. Run development server
python manage.py runserver
```

Notes:
- Settings use SQLite for quick local development. For production, update `DATABASES` in `smartduka_backend/settings.py`.
- The repository includes a `.env.example` to show env variables you should set locally.

API endpoints (after running the server):

- `GET/POST /api/sales/`
- `GET/POST /api/expenses/`
- `GET/POST /api/stock/`
- `GET/POST /api/debts/`
- `GET/POST /api/cashfloat/`

Frontend integration tip:
- Set `VITE_API_BASE` in your frontend `.env` to point to the backend (e.g. `http://127.0.0.1:8000`).
