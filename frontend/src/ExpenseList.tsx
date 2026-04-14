import { deleteExpense } from "./api";

export default function ExpenseList({
  expenses,
  refresh,
  onEdit,
}: any) {
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this expense?")) return;

    await deleteExpense(id);
    refresh();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {expenses.map((exp: any) => (
        <div key={exp.id} style={card}>
          <div>
            <p style={{ fontWeight: "bold" }}>
              {exp.title} - ₹{exp.amount}
            </p>

            <p style={{ color: "gray" }}>
              {exp.category}
              {exp.note && ` | ${exp.note}`}
            </p>
          </div>

          <div style={buttonGroup}>
            <button style={editBtn} onClick={() => onEdit(exp)}>
              Edit
            </button>

            <button
              style={deleteBtn}
              onClick={() => handleDelete(exp.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* styles */
const card = {
  background: "white",
  padding: 15,
  borderRadius: 8,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const buttonGroup = {
  display: "flex",
  gap: 10, 
};

const editBtn = {
  padding: "6px 10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};

const deleteBtn = {
  padding: "6px 10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};