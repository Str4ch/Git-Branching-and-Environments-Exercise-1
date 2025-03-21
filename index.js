const express = require('express');
const app = express();
const port = 3000;
const controller = require("./controller");
app.use(express.json());

app.post('/', async (req, res) => {
    res.send(await controller.createStudent(req.body));
});

app.get('/', async (req, res) => {
    res.send(await controller.readStudent());
});

app.put('/',async (req, res) => {
    res.send(await controller.updateStudent(req.body));
});

app.delete('/', async (req, res) => {
    res.send(await controller.deleteStudent(req.body.id));
});
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});