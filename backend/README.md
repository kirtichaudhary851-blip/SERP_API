# Backend Setup

## Project Structure

backend/
├── app/
│   ├── api/
│   │   └── routes/
│   ├── core/
│   ├── schemas/
│   ├── services/
│   └── utils/
├── main.py
├── requirements.txt
└── README.md

## Virtual Environment Setup

From the project root:

```bash
cd backend
python -m venv .venv
```

### Activate on Windows

```powershell
.venv\Scripts\Activate.ps1
```

### Install dependencies

```bash
pip install -r requirements.txt
```

## Run the API

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- http://localhost:8000/
- http://localhost:8000/docs
