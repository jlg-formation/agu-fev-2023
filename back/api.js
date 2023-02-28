const express = require("express");

const api = express.Router();

api.get("/date", (req, res) => {
  res.json({ date: new Date() });
});

module.exports = api;
