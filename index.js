const express = require('express');
const connection = require('./connection');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
    const {firstName, lastName, age, grade, email} = req.body;
    if(!firstName || !lastName || !age || !grade || !email) return res.status(400).json({error: "All fields are required!"});
    try {
        connection.query(`INSERT INTO students (first_name,last_name, age, grade, email )
             VALUES ('${firstName}', '${lastName}', ${age}, '${grade}', '${email}')`);
        res.send("Student created succesfully");        
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Database connection failed');
    }
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
    const {id, firstName, lastName, age, grade, email} = req.body;
    if(!firstName || !lastName || !age || !grade || !email || !id) return res.status(400).json({error: "All fields are required!"});
    try {
        connection.query(`UPDATE students 
                          SET first_name = '${firstName}', last_name = '${lastName}', grade = '${grade}', age = ${age}, email = '${email}'
                          WHERE id = ${id};`);
        res.send("Student updated succesfully");        
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Database connection failed');
    }
});

app.delete('/', (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({error: "All fields are required!"});
    try {
        connection.query(`DELETE FROM students
                          WHERE id = ${id};`);
        res.send("Student deleted succesfully");        
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Database connection failed');
    }
});
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});