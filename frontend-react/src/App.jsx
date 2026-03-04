import React from "react";
import { useEffect, useState } from "react";
import { getFiguras } from "./services/api";

export default function App() {
  const [figuras, setFiguras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nombreAnime, setNombreAnime] = useState("");
  const [jikanResults, setJikanResults] = useState([]);
  const [jikanLoading, setJikanLoading] = useState(false);
  const [jikanError, setJikanError] = useState("");

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

  const buscarAnime = async () => {
    try {
      setJikanLoading(true);
      setJikanError("");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/figuras/jikan/buscar?nombre=${encodeURIComponent(nombreAnime)}`
      );
      if (!response.ok) {
        throw new Error("Error al buscar en Jikan API");
      }
      const data = await response.json();
      setJikanResults(data.results || []);
    } catch (e) {
      console.error(e);
      setJikanError("No se pudieron cargar los resultados de Jikan API.");
    } finally {
      setJikanLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Colección de Figuras Anime</h1>

      <div style={{ marginBottom: 24 }}>
        <h2>Buscar anime (Jikan API)</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del anime"
            value={nombreAnime}
            onChange={(e) => setNombreAnime(e.target.value)}
          />
          <button className="btn btn-primary" onClick={buscarAnime} disabled={jikanLoading}>
            Buscar
          </button>
        </div>
        {jikanLoading && <p>Cargando resultados...</p>}
        {jikanError && <p style={{ color: "red" }}>{jikanError}</p>}
        <ul className="list-group">
          {jikanResults.map((anime, index) => (
            <li key={index} className="list-group-item">
              <h5>{anime.titulo}</h5>
              <p><b>Score:</b> {anime.score}</p>
              <p><b>Episodios:</b> {anime.episodios}</p>
              {anime.imagen && <img src={anime.imagen} alt={anime.titulo} style={{ width: 100, height: 100, objectFit: "cover" }} />}
              <p>
                <a href={anime.enlaceMAL} target="_blank" rel="noopener noreferrer">
                  Ver en MyAnimeList
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>

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

              {f.imagen?.startsWith("http") && (
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