import express from "express";
import favicon from "serve-favicon";
import path from "path";

import indexRouter from "../routes/index.js";
import coursesRouter from "../routes/courses.js";

const __dirname = import.meta.dirname;

const PORT = 3000;

const app = express();

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", indexRouter);
app.use("/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
