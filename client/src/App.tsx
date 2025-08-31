import { useState, useEffect } from "react";
import "./App.css";

interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏢 Admix Insurance SaaS</h1>
        <p>Platform Status: {health?.status || "Error"}</p>
        <p>Service: {health?.service}</p>
        <small>Last Check: {health?.timestamp}</small>
      </header>
    </div>
  );
}

export default App;
