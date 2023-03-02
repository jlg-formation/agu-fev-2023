import { Router } from "express";
import { Article } from "./interfaces/article";

const api = Router();

const articles: Article[] = [
  { id: "a1", name: "Marteau", price: 3.45, qty: 123 },
  { id: "a2", name: "Pelle", price: 12, qty: 45 },
];

api.get("/date", (req, res) => {
  res.json({ date: new Date() });
});

api.get("/articles", (req, res) => {
  res.json(articles);
});

export default api;
