console.log("Start the server...");

import express from "express";
import serveIndex from "serve-index";
import api from "./api";
// import cors from "cors";

const app = express();
const port = 3000;
const publicDir = "../front/dist/front";

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

// app.use(cors());

app.use("/api", api);

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: publicDir });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
