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
  const menu = req.query.menu;
  console.log(menu);
  const applications_list = [
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
    { status: 1, date: "2022-01-01", subject: "Vacation" },
    { status: 2, date: "2022-02-15", subject: "Sick Leave" },
  ];
  const att_data = {
    subject1: "ranac",
    attendance1: 10,
    totalClasses1: 100,

    subject2: "OS",
    attendance2: 40,
    totalClasses2: 100,

    subject3: "ADSA",
    attendance3: 50,
    totalClasses3: 100,

    subject4: "DBMS",
    attendance4: 30,
    totalClasses4: 100,

    subject5: "PC",
    attendance5: 70,
    totalClasses5: 100,

    subject6: "SE",
    attendance6: 90,
    totalClasses6: 100,
  };
  res.render("index", {
    title: "Student_Dashboard",
    role: "student",
    menu,
    applications_list,
    att_data,
  });
});
app.get("/admin/dashboard", (req, res) => {
  const menu = req.query.menu;
  res.render("index", { title: "Student_Dashboard", role: "admin", menu });
});

app.listen(port, (req, res) => {
  console.log("Server running");
});
