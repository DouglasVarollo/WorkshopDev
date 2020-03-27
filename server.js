const express = require("express");
const nunjucks = require("nunjucks");

const db = require("./db");

const server = express();

nunjucks.configure("views", {
  noCache: true,
  express: server
});

server.use("/", express.static("public"));
server.use(express.urlencoded({ extended: true }));

server.get("/", function(req, res) {
  db.all("SELECT * FROM ideas", function(err, rows) {
    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados");
    }

    const lastIdeas = [];

    for (let idea of rows) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    return res.render("index.html", {
      ideas: lastIdeas
    });
  });
});

server.post("/", function(req, res) {
  const { title, category, image, description, link } = req.body;

  const query = `INSERT INTO ideas (
    image,
    title,
    category,
    description,
    link
  ) VALUES (?, ?, ?, ?, ?)
`;

  const values = [image, title, category, description, link];

  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados");
    }

    return res.redirect("/ideias");
  });
});

server.get("/ideias", function(req, res) {
  db.all("SELECT * FROM ideas", function(err, rows) {
    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados");
    }

    const reversedIdeas = rows.reverse();

    return res.render("ideias.html", {
      ideas: reversedIdeas
    });
  });
});

server.listen(3000);
