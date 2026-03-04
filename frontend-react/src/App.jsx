import { useEffect, useState } from "react";
import { getFiguras } from "./services/api";

export default function App() {
  const [figuras, setFiguras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setLoading(true);
        setError("");
        const data = await getFiguras();
        setFiguras(data.data || []);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar las figuras.");
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Colección de Figuras Anime</h1>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {figuras.map((f) => (
            <div key={f._id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
              <h3>{f.nombre}</h3>
              <p><b>Anime:</b> {f.anime}</p>
              <p><b>Personaje:</b> {f.personaje}</p>
              <p><b>Precio:</b> {f.precio}€</p>
              <p><b>Stock:</b> {f.stock}</p>

              {f.imagen && (
                <img
                  src={f.imagen}
                  alt={f.nombre}
                  style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10 }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}