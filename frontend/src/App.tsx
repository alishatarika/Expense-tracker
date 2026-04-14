import { useEffect, useState } from "react";
import { getExpenses } from "./api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function App() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // "YYYY-MM"
  );

  const fetchExpenses = async () => {
    const res = await getExpenses();
    
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 🔥 Filter expenses by selected month
  const filteredExpenses = expenses.filter((exp) => {
    if (!exp.date) return true; // fallback if no date
    return exp.date.startsWith(selectedMonth);
  });

  // 🔥 Calculate total
  const total = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div
      style={{
        padding: 20,
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h2>Expense Tracker</h2>

      {/* 🔥 TOP DASHBOARD */}
      <div style={topCard}>
        <div>
          <p style={{ fontSize: 12, color: "gray" }}>
            Total Spending
          </p>
          <h2>₹{total.toLocaleString()}</h2>
        </div>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={monthInput}
        />
      </div>

      <ExpenseForm
        refresh={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <ExpenseList
        expenses={filteredExpenses} // 👈 important
        refresh={fetchExpenses}
        onEdit={setEditingExpense}
      />
    </div>
  );
}

export default App;

/* styles */
const topCard = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const monthInput = {
  padding: "6px",
};