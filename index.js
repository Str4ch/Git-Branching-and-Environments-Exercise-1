const express = require('express');
const connection = require('./connection');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
    res.send('CREATE');
});

app.get('/', (req, res) => {
    try {
        const result = connection.query('SELECT * from students');
        result.then(data => {
            res.send(data.rows);
        });
        
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Database connection failed');
    }
});

app.put('/', (req, res) => {
    res.send('UPDATE');
});

app.delete('/', (req, res) => {
    res.send("DELETE");
});
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});