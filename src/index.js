const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const studentRoute  = require('./routes/student.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use("/student", studentRoute);

app.get('/', (req, res) => {
	res.json({
		status: true
	})
});
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});