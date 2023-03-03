import { json, Router } from "express";
import { Article, NewArticle } from "./interfaces/article";
import { generateId } from "./misc";

const api = Router();

let articles: Article[] = [
  { id: "a1", name: "Marteau", price: 3.45, qty: 123 },
  { id: "a2", name: "Pelle", price: 12, qty: 45 },
];

api.get("/date", (req, res) => {
  res.json({ date: new Date() });
});

api.get("/articles", (req, res) => {
  res.json(articles);
});

api.use(json());

api.post("/articles", (req, res) => {
  const newArticle: NewArticle = req.body;
  const article = { id: generateId(), ...newArticle };
  articles.push(article);
  res.status(201).end();
});

api.delete("/articles", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

export default api;
