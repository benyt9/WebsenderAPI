import express from "express";
const app = express();
app.use(express.json());

// API-Key für Sicherheit
const API_KEY = process.env.API_KEY || "blocktopia123";

// Temporärer Speicher für User-Daten
const users = {};

// Healthcheck / Basis-URL
app.get("/", (req, res) => {
  res.send("🚀 BlockTopia API läuft!");
});

// POST-Endpoint für Plugin-Updates
app.post("/api/luckperms/update", (req, res) => {
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) return res.status(401).json({ error: "Ungültiger API-Key" });

  const { uuid, name, group } = req.body;
  if (!uuid || !name || !group) return res.status(400).json({ error: "Ungültige Daten" });

  // Daten speichern
  users[name.toLowerCase()] = { uuid, name, group, updated: new Date() };
  console.log(`Update von ${name}: ${group}`);

  res.sendStatus(200);
});

// GET-Endpoint für Webseite
app.get("/api/luckperms/user/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  if (!users[name]) return res.status(404).json({ error: "User nicht gefunden" });
  res.json(users[name]);
});

// Railway Port nutzen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API läuft auf Port ${PORT}`));
