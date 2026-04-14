from pydantic import BaseModel
from typing import Optional


class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    date: str          
    note: Optional[str] = ""


class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    date: Optional[str] = None
    note: Optional[str] = None
    


class ExpenseOut(ExpenseCreate):
    id: int
    created_at: str