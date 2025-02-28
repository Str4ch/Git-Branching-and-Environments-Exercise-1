const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
    res.send('CREATE');
});

app.get('/', (req, res) => {
  res.send('READ');
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