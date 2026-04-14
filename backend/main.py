from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from connection.database import db
from models.expense_model import Expense
from controllers.expense_controller import router as expense_router

# ── App setup ─────────────────────────────────────────────────────────────────
app = FastAPI(title="Expense Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Database init ─────────────────────────────────────────────────────────────
db.connect()
db.create_tables([Expense], safe=True)

# ── Register routers ──────────────────────────────────────────────────────────
app.include_router(expense_router)
