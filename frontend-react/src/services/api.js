import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const FIGURAS_URL = `${API_URL}/figuras`;

export async function getFiguras() {
  const res = await axios.get(`${FIGURAS_URL}/get/all`);
  return res.data;
}