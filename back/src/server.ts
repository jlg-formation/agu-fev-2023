console.log("Start the server...");

import express from "express";
import serveIndex from "serve-index";
import api from "./api";
import cors from "cors";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

app.use(cors());

app.use("/api", api);

app.use(express.static("."));
app.use(serveIndex(".", { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
