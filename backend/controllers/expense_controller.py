from fastapi import APIRouter, HTTPException
from typing import Optional

from schema.expense_schema import ExpenseCreate, ExpenseUpdate, ExpenseOut
import services.expense_service as service

router = APIRouter(tags=["Expenses"])


@router.get("/expenses")
def list_expenses(category: Optional[str] = None, month: Optional[str] = None):
    return service.get_all_expenses(category, month)

@router.post("/expenses", status_code=201)
def create_expense(data: ExpenseCreate):
    return service.create_expense(data.model_dump())


@router.put("/expenses/{expense_id}")
def update_expense(expense_id: int, data: ExpenseUpdate):
    try:
        return service.update_expense(expense_id, data.model_dump())
    except Exception:
        raise HTTPException(status_code=404, detail="Expense not found")



@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):
    try:
        service.delete_expense(expense_id)
        return {"detail": "Deleted successfully"}
    except Exception:
        raise HTTPException(status_code=404, detail="Expense not found")