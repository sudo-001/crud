const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

const port = 3000;

/**
 * Connexion a la base de donnees
 */
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "practice-DB",
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Base de donnees mysql connectee!");
  }
});

/**Fin connexion a la base de donnees */

// Debut de notre appplication
app.get("/", (req, res) => {
  console.log("Bienvenue sur user-manager!");
  res.send("Bienvenue sur user-manager!");
});

// Route pour avoir tout les utilisateurs
app.get("/user", (req, res) => {
  const sql = "SELECT * FROM User";
  // On execute la requete SQL dans notre application sur notre base de donnees
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
  //   res.send("Liste des utilisateurs");
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM User WHERE id = ${id}`;

  db.query(sql, (err, results) => {
    if (err) {
      // res.status(404).send("Utilisateur non trouve")
      console.error(err);
      res.send("Utilisateur non trouve");
    } else {
      res.json(results);
    }
  });
});

app.post("/user", (req, res) => {
  const { name, prenom, profession } = req.body;
  const sql = "INSERT INTO User (name, prenom, profession) VALUES (?, ?, ?)";
  db.query(sql, [name, prenom, profession], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("Utilisateur ajoute !");
  });
});

// On lance notre serveur
app.listen(port, () => {
  console.log("L'application tourne sur a l'adresse : http://127.0.0.1/3000");
});
