import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 BlockTopia API läuft!");
});

app.listen(3000, () => console.log("✅ API läuft auf Port 3000"));
