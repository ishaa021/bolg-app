const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Temporary storage (NO DATABASE)
let posts = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



// View Engine
app.set("view engine", "ejs");

// HOME – View all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// NEW POST FORM
app.get("/new", (req, res) => {
  res.render("new");
});

// CREATE POST
app.post("/create", (req, res) => {
  const { title, content } = req.body;

  posts.push({
    id: Date.now(),
    title,
    content
  });

  res.redirect("/");
});

// EDIT POST FORM
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit", { post });
});

// UPDATE POST
app.post("/update/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

// DELETE POST
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});