import { Router } from "express";

const api = Router();

api.get("/date", (req, res) => {
  res.json({ date: new Date() });
});

export default api;
