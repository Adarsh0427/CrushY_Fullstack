import express from "express";
import ejs from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
console.log(__dirname);
app.set("views", path.join(__dirname, "./client/views"));
// => Here we expose the views so it can be rendered.
app.set("view engine", "ejs");
// => Here we expose your dist folder so it can be accessed.

app.use(express.static(path.join(__dirname, "./client/public")));

app.get("/student/dashboard", (req, res) => {
  res.render("index", { title: "Student_Dashboard" });
});

app.listen(port, (req, res) => {
  console.log("Server running");
});
