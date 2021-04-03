const { SSL_OP_NETSCAPE_CA_DN_BUG } = require('constants');
const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
    {
        ID: '',
        Name: '',
        Email: '',
        Phone: ''
    }
]

// Routes
// res.send("Make your reservation!")
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// Displays all tables
app.get('/api/tables', (req, res) => res.json(tables));

// Displays a single table, or returns false
app.get('/api/tables/:reservation', (req, res) => {
  const tableData = req.params.tables;

  console.log(tableData);

  for (let i = 0; i < tables.length; i++) {
    if (tableData === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

  // Create New Tables - takes in JSON input
app.post('/api/tables', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newReservation = req.body;
  
    console.log(newReservation);
  
    // We then add the json the user sent to the character array
    tables.push(newReservation);
  
    // We then display the JSON to the users
    res.json(newReservation);
  });
  
  // Starts the server to begin listening
  
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));