const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const courses = [
  {
    id: "5ba7d98f53c989d6ee8dbb5b",
    name: "name",
    duration: 62,
    description: "asdf asdfas asdfasdf",
    createDate: new Date().toString()
  },
  {
    id: "5ba7d98f53c989d6ee8dbb5a",
    name: "name1",
    duration: 70,
    description: "asdf asdfas asdfasdf2",
    createDate: new Date().toString()
  }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/signin", (req, res) => {
  const { login, password } = req.body;

  if (login !== "login" || password !== "password") {
    return res.status(401).end();
  }

  return res.json({
    username: "gohn_doe"
  });
});

app.listen(8080, () => console.log("server is listening on port 8080"));
