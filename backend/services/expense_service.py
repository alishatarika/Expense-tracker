import calendar
from typing import Optional
from models.expense_model import Expense


CATEGORIES = [
    "Food & Dining", "Transport", "Shopping", "Entertainment",
    "Health", "Housing", "Education", "Travel", "Utilities", "Other"
]


def _month_range(month: str):
    year, mon = int(month.split("-")[0]), int(month.split("-")[1])
    last_day = calendar.monthrange(year, mon)[1]
    return f"{month}-01", f"{month}-{last_day:02d}"


def row_to_dict(exp: Expense) -> dict:
    return {
        "id": exp.id,
        "title": exp.title,
        "amount": exp.amount,
        "category": exp.category,
        "date": str(exp.date),
        "note": exp.note,
        "created_at": str(exp.created_at),
    }


def get_all_expenses(category: Optional[str], month: Optional[str]) -> list:
    query = Expense.select().order_by(Expense.date.desc())

    if category:
        query = query.where(Expense.category == category)

    if month:
        start, end = _month_range(month)
        query = query.where(Expense.date.between(start, end))

    return [row_to_dict(e) for e in query]


def get_expense_by_id(expense_id: int) -> Expense:
    return Expense.get_by_id(expense_id)


def create_expense(data: dict) -> dict:
    exp = Expense.create(**data)
    return row_to_dict(exp)


def update_expense(expense_id: int, data: dict) -> dict:
    exp = Expense.get_by_id(expense_id)
    exp.title = data["title"]
    exp.amount = data["amount"]
    exp.category = data["category"]
    exp.date = data["date"]
    exp.note = data.get("note", "")
    exp.save()
    return row_to_dict(exp)


def delete_expense(expense_id: int) -> None:
    exp = Expense.get_by_id(expense_id)
    exp.delete_instance()


def get_summary(month: Optional[str]) -> dict:
    query = Expense.select()

    if month:
        start, end = _month_range(month)
        query = query.where(Expense.date.between(start, end))

    expenses = list(query)
    total = sum(e.amount for e in expenses)

    by_category: dict[str, float] = {}
    for e in expenses:
        by_category[e.category] = round(by_category.get(e.category, 0) + e.amount, 2)

    return {
        "total": round(total, 2),
        "by_category": by_category,
        "count": len(expenses)
    }


def get_categories() -> list:
    return CATEGORIES