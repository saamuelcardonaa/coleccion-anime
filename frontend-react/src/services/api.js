import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getFiguras() {
  const res = await axios.get(`${API_URL}/api/v1/figuras/get/all`);
  return res.data;
}