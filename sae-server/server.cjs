const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
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

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil');
});
// Route pour /api/test
app.get('/stones', (req, res) => {
    db.all('SELECT * FROM Stones', (err, rows) => {
        if (err) {
            console.error('Error fetching pierres:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); // Return the list of recipes as JSON response
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

  db.run('INSERT INTO Stones (name, description, price) VALUES (?, ?, ?)', [name, description, price], function (err) {
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


// Route POST pour supprimer une pierre à la table Pierres
app.delete('/stones/:stoneID', (req, res) => {
  const stoneID = req.params.stoneID;

  // Vérifiez si l'ID de la pierre est fourni
  if (!stoneID) {
      res.status(400).json({ error: 'Stone ID is required' });
      return;
  }

  console.log(`Trying to delete stone with ID: ${stoneID}...`);

  // Exécutez la requête DELETE dans la base de données
  db.run('DELETE FROM Stones WHERE stoneID = ?', [stoneID], function (err) {
      if (err) {
          console.error('Error deleting stone:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }

      // Vérifiez si des lignes ont été affectées (si la pierre a été trouvée et supprimée)
      if (this.changes > 0) {
          console.log('Deletion successful!');
          res.json({ success: true, message: `Stone with ID ${stoneID} deleted successfully` });
      } else {
          console.log('Stone not found');
          res.status(404).json({ error: `Stone with ID ${stoneID} not found` });
      }
  });
});


// Port d'écoute du serveur Express
const port = process.env.PORT || 3001;

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port http://localhost:${port}`);
});