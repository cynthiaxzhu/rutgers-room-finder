import express from "express";
import { request } from "undici";

import { CAMPUS, YEAR, TERM_NUM } from "../public/js/constants.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const url = new URL("https://classes.rutgers.edu/soc/api/courses.gz");
  url.searchParams.set("campus", CAMPUS);
  url.searchParams.set("year", YEAR);
  url.searchParams.set("term", TERM_NUM);
  
  try {
    const { body } = await request(url);
    const data = await body.bytes();
    
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (error) {
    throw error;
  }
});

export default router;
