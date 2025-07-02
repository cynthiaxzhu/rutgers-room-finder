import express from "express";
import path from "path";

const __dirname = import.meta.dirname;

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "..", "public") });
});

export default router;
