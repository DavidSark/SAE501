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
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
          console.error('Error fetching pierres:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(rows); 
  });
});


// Route pour afficher toutes les pierres 
app.get('/stones', (req, res) => {
    db.all('SELECT * FROM stones', (err, rows) => {
        if (err) {
            console.error('Error fetching pierres:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); 
    });
  });

// Route pour afficher toutes les pierres 
app.get('/boitiers', (req, res) => {
    db.all('SELECT * FROM boitiers', (err, rows) => {
        if (err) {
            console.error('Error fetching pierres:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); 
    });
  });




//----------------------------------------Route POST-------------------------------------//


// Route pour créer un compte utilisateur
app.post('/register', (req, res) => {
  const { name, password} = req.body;
  if (!name || !password) {
      res.status(400).json({ error: 'Name, password, are required' });
      return;
  }
  console.log('Trying to create user account...');
  db.run('INSERT INTO Users (userName, password) VALUES (?, ?)',
      [name, password],
      function (err) {
          const userID = this.lastID;

          if (err) {
              console.error('Error creating user account:', err.message);
              res.status(500).json({ error: 'Internal server error' });
              return;
          }

          console.log('User account creation successful!');
          res.json({ userID, name, password});
      });
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe sont requis pour se connecter' });
    return;
  }
  console.log('Trying to log in user...');
  // Recherche de l'utilisateur dans la base de données par le nom d'utilisateur
  db.get('SELECT * FROM Users WHERE userName = ? AND password = ?', [name, password], (err, user) => {
    if (err) {
      console.error('Error logging in user:', err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (!user) {
      console.log('User not found or incorrect password');
      res.status(401).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
      return;
    }
    // Envoyer une réponse JSON pour signaler la connexion réussie
    res.json({ token: user.userID });

    console.log(`${name} connecté avec succès!`);
  });
});














// Route POST pour ajouter une pierre à la table Stones
app.post('/stones/add', (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    res.status(400).json({ error: 'stone name, description, and price are required' });
    return;
  }
  console.log('Trying to insert into database...');
  db.run('INSERT INTO Stones (stoneName, stonePrice,) VALUES (?, ?)', [name, description, price], function (err) {
    const stone_id = this.lastID; 
    if (err) {
      console.error('Error adding pierres:', err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    console.log('Insertion successful!');
    res.json({ stoneID: stone_id, name, description, price });
  });
});

// Route POST pour ajouter un bracelet à la table bracelet
app.post('/bracelets/add', (req, res) => {
  const { type, price } = req.body;
  if (!type || !price) {
    res.status(400).json({ error: 'type, and price are required' });
    return;
  }
  console.log('Trying to insert into database...');
  db.run('INSERT INTO Bracelets (braceletName, branceletPrice, braceletTexture) VALUES (?, ?, ?)', [type, price], function (err) {
    const bracelet_id = this.lastID; 
    if (err) {
      console.error('Error adding pierres:', err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    console.log('Insertion successful!');
    res.json({ braceletID: bracelet_id, type, price });
  });
});

// Route POST pour ajouter un produit au panier d'un utilisateur
app.post('/users/:userID/cart/add', (req, res) => {
  const userID = req.params.userID;
  const { watchID } = req.body;

  // Vérifiez si l'id du produit est fourni
  if (!watchID) {
      res.status(400).json({ error: 'ID du produit est requis' });
      return;
  }

  console.log(`Trying to add product ${watchID} to user ${userID}'s cart...`);

  // Vérifiez si l'utilisateur existe
  db.get('SELECT * FROM Users WHERE userID = ?', [userID], (err, user) => {
      if (err) {
          console.error('Error checking user:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (!user) {
          console.log('User not found');
          res.status(404).json({ error: 'Utilisateur non trouvé' });
          return;
      }
      // Ajoutez le produit au panier de l'utilisateur
      db.run('INSERT INTO Carts (userID, watchID,) VALUES (?, ? )',
          [userID, watchID, 'en_attente'],
          function (insertErr) {
              if (insertErr) {
                  console.error('Error adding product to cart:', insertErr.message);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
              }
              console.log('Product added to cart successfully!');
              res.json({ success: true, message: `Produit ${watchID} ajouté au panier de l'utilisateur ${userID}` });
          });
  });
});


// Route POST pour ajouter une montre à la base de données
app.post('/watches/add', (req, res) => {
  const { userID, boitierID, stoneID, braceletID } = req.body;

  // Vérifiez si les informations nécessaires sont fournies
  if (!userID || !boitierID || !stoneID || !braceletID) {
      res.status(400).json({ error: 'Toutes les informations nécessaires sont requises pour ajouter une montre' });
      return;
  }

  console.log('Trying to add a watch to the database...');

  // Exécutez la requête d'insertion dans la table des Montres
  db.run('INSERT INTO Watches (boitierID, stoneID, braceletID) VALUES (?, ?, ?)',
      [boitierID, stoneID, braceletID],
      function (err) {
          if (err) {
              console.error('Error adding watch:', err.message);
              res.status(500).json({ error: 'Internal server error' });
              return;
          }

          const watchID = this.lastID;

          // Enregistrez l'association entre l'utilisateur et la montre dans la table de liaison
          db.run('INSERT INTO UserWatches (userID, watchID) VALUES (?, ?)', [userID, watchID], insertErr => {
              if (insertErr) {
                  console.error('Error adding user-watch association:', insertErr.message);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
              }

              console.log('User-watch association added successfully!');
              res.json({ watchID, userID, boitierID, stoneID, braceletID });
          });
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