const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
//Enable CORS from all origins
app.use(cors());


// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Middleware for parsing JSON requests



// Connect to your SQLite database
const db = new sqlite3.Database('../database/sae501-bdd.bd', (err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
    } else {
      console.log('Connected to the database');
    }
  });


//----------------------------------------Route GET-------------------------------------//


// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil');
});

// Route pour afficher tous les utilisateurs
app.get('/user', (req, res) => {
  db.all('SELECT * FROM user', (err, user) => {
      if (err) {
          console.error('Error fetching users:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(user); 
  });
});

// Route pour afficher tous les utilisateurs
app.get('/user/:id_user', (req, res) => {
  const { id_user } = req.params;

  db.all(`
      SELECT m.montreID, m.nom,
          u.pseudo AS createur,
          bot.nom AS boitier_texture, bot.prix AS boitier_texture_prix,
          bof.nom AS boitier_forme, bof.prix AS boitier_forme_prix,
          brf.nom AS bracelet_texture, brf.prix AS bracelet_texture_prix,
          p.nom AS pierre_nom, p.prix AS pierre_prix, p.couleur AS pierre_couleur,
          m.main_color,
      COALESCE(bot.prix, 0) + COALESCE(bof.prix, 0) + COALESCE(brf.prix, 0) + COALESCE(p.prix, 0) AS prix_montre
      FROM Montre m 
      JOIN User u ON m.userID = u.userID
      JOIN Boitier_Texture bot ON m.boitierTextureID = bot.boitierTextureID
      JOIN Boitier_Forme bof ON m.boitierFormeID = bof.boitierFormeID
      JOIN Bracelet_Texture brf ON m.braceletTextureID = brf.braceletTextureID
      JOIN Pierre p ON m.pierreID = p.pierreID
      WHERE m.userID = ?
      `, [id_user], (err, user) => {

      if (err) {
          console.error("Erreur, le user n'a pas été trouvé : ", err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }

      res.json(user);
  });
});

// Route pour afficher toutes les pierres 
app.get('/pierres', (req, res) => {
    db.all('SELECT * FROM pierre', (err, rows) => {
        if (err) {
            console.error('Error fetching pierres:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); 
    });
  });

// Route pour afficher toutes les textures de boitiers 
app.get('/boitier_texture', (req, res) => {
    db.all('SELECT * FROM Boitier_Texture', (err, rows) => {
        if (err) {
            console.error('Error fetching Boitier_Texture:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); 
    });
  });
// Route pour afficher toutes les formes de boitiers 
app.get('/boitier_forme', (req, res) => {
    db.all('SELECT * FROM Boitier_Forme', (err, rows) => {
        if (err) {
            console.error('Error fetching Boitier_Forme:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); 
    });
  });

 app.get('/bracelet_texture', (req, res) => {
  db.all(`
        SELECT *
        FROM Bracelet_Texture 
        `, (err, bracelet_texture) => {

        if (err) {
            console.error("Erreur, les textures de bracelets n'ont pas été trouvées :", err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(bracelet_texture);
    });
});

// Route pour afficher toutes les montres 
app.get('/montre', (req, res) => {
  db.all('SELECT * FROM Montre', (err, rows) => {
      if (err) {
          console.error('Error fetching watches:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(rows); 
  });
});






//----------------------------------------Route POST-------------------------------------//


// Route pour créer un compte utilisateur
app.post('/register', (req, res) => {
  const { pseudo, mdp} = req.body;
  if (!pseudo || !mdp) {
      res.status(400).json({ error: 'pseudo, mdp, are required' });
      return;
  }
  console.log('Trying to create user account...');
  db.run('INSERT INTO User (pseudo, mdp) VALUES (?, ?)',
      [pseudo, mdp],
      function (err) {
          const userID = this.lastID;

          if (err) {
              console.error('Error creating user account:', err.message);
              res.status(500).json({ error: 'Internal server error' });
              return;
          }

          console.log('User account creation successful!');
          res.json({ userID, pseudo, mdp});
      });
});

// Route pour se connecter
app.post('/login', (req, res) => {
  const { pseudo, mdp } = req.body;
  if (!pseudo || !mdp) {
    res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe sont requis pour se connecter' });
    return;
  }
  console.log('Trying to log in user...');
  // Recherche de l'utilisateur dans la base de données par le nom d'utilisateur
  db.get('SELECT * FROM User WHERE pseudo = ? AND mdp = ?', [pseudo, mdp], (err, user) => {
    if (err) {
      console.error('Error logging in user:', err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (!user) {
      console.log('User not found or incorrect mdp');
      res.status(401).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
      return;
    }
    // Envoyer une réponse JSON pour signaler la connexion réussie
    res.json({ token: user.userID });

    console.log(`${pseudo} connecté avec succès!`);
  });
});

// Route POST pour ajouter une montre à la base de données
app.post('/montre/add', (req, res) => {
  const {nom, boitier_texture, boitier_forme, bracelet_texture, pierre_nom, main_color, dernier_utilisateur } = req.body;
  console.log(req.body)

  // Vérifie si tous les paramètres sont renseignés
  if ( !nom || !boitier_texture || !boitier_forme || !bracelet_texture || !pierre_nom || !main_color || !dernier_utilisateur) {
      res.status(400).json({ error: 'nom, boitier_texture, boitier_forme, bracelet_texture, pierre_nom, main_color dernier_utilisateur are required' });
      return;
  }

  // vérifie si la montre existe déjà
  db.all(`
      SELECT *
      FROM Montre 
      WHERE nom = ?
      `, [nom], (err, montre) => {

      if (err) {
          console.error("Erreur, les montres n'ont pas pue être récupérées : ", err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }

      // Si la monte n'existe pas déjà, l'ajouter
      if (montre.length == 0){
          db.run(`INSERT
              INTO Montre (
                nom,
                boitierTextureID,
                boitierFormeID,
                braceletTextureID,
                pierreID,
                main_color,
                dernier_utilisateur               
            )
            VALUES (
                ?,
                (SELECT boitierTextureID FROM Boitier_Texture WHERE nom = ?),
                (SELECT boitierFormeID FROM Boitier_Forme WHERE nom = ?),
                (SELECT braceletTextureID FROM Bracelet_Texture WHERE nom = ?),
                (SELECT pierreID FROM Pierre WHERE nom = ?),
                ?,
                (SELECT userID FROM User WHERE pseudo = ?)
              )`,
              [nom, boitier_texture, boitier_forme, bracelet_texture, pierre_nom, main_color, dernier_utilisateur], function (err) {
              if (err) {
                  console.error("Erreur, la montre n'a pas pue être créée : ", err.message);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
              }
              res.json({ message: "Montre créée avec succès." });
          });
      } else {
          res.json({ message : "Cette montre existe déjà" });
      }
  });
      
});






//----------------------------------------Route DELETE-------------------------------------//


//----------------------------------------------------------------------------------------//


// Port d'écoute du serveur Express
const port = process.env.PORT || 3001;

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port http://localhost:${port}`);
});