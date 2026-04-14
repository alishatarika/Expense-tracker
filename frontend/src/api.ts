import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getExpenses = () => axios.get(`${API}/expenses`);
export const addExpense = (data: any) => axios.post(`${API}/expenses`, data);
export const deleteExpense = (id: number) =>
  axios.delete(`${API}/expenses/${id}`);
export const updateExpense = (id: number, data: any) =>
  axios.put(`http://127.0.0.1:8000/expenses/${id}`, data);