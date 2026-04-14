import { useEffect, useState } from "react";
import { addExpense, updateExpense } from "./api";

const categories = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Travel",
  "Other",
];

const today = new Date().toISOString().split("T")[0];

export default function ExpenseForm({
  refresh,
  editingExpense,
  setEditingExpense,
}: any) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || "");
      setAmount(editingExpense.amount?.toString() || "");
      setCategory(editingExpense.category || categories[0]);
      setDate(editingExpense.date || today);
      setNote(editingExpense.note || "");
    }
  }, [editingExpense]);

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!amount || Number(amount) <= 0) return "Enter valid amount";
    if (!category) return "Select category";
    if (!date) return "Select date";
    return "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");

    const data = {
      title: title.trim(),
      amount: Number(amount),
      category,
      date,   
      note,    
    };

    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, data);
        setEditingExpense(null);
      } else {
        await addExpense(data);
      }

      setTitle("");
      setAmount("");
      setCategory(categories[0]);
      setDate(today);
      setNote("");

      refresh();
    } catch (e) {
      setError("Update failed. Check backend.");
      console.error(e);
    }
  };

  return (
    <form style={formCard} onSubmit={handleSubmit}>
      <h3>{editingExpense ? "Edit Expense" : "Add Expense"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input style={input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <input style={input} type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <select style={input} value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input style={input} type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <input style={input} placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />

      <div style={{ marginTop: 10 }}>
        <button style={btn} type="submit">
          {editingExpense ? "Update" : "Add"}
        </button>

        {editingExpense && (
          <button
            type="button"
            style={{ ...btn, background: "gray", marginLeft: 10 }}
            onClick={() => setEditingExpense(null)}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const formCard = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
};

const input = {
  display: "block",
  width: "100%",
  padding: "8px",
  margin: "8px 0",
  color: "black",
};

const btn = {
  padding: "8px 12px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: 5,
};