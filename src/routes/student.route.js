const express = require("express");
const router = express.Router();

const studentController = require('../controllers/student.controller');

router.get('/', async (req, res) => {
  try {
    const students = await studentController.readStudent();
    res.json({
      students,
      status: 200,
      message: 'Students read successfully!'
    });
  } catch (err) {
    res.json({
      students: null,
      status: err.code || err.statusCode || 500,
      message: err.message || 'Something went wrong while reading item from DB!'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, age, grade, email} = req.body;
    const msg = await studentController.createStudent({ firstName, lastName, age, grade, email});

    res.json({
      status: 200,
      message: msg
    })
  } catch (err) {
    res.json({
      status: err.code || err.statusCode || 500,
      message: err.message || 'Something went wrong while creating new item!'
    });
  }
});

router.put('/', async (req, res) => {
  try {
    const {id, firstName, lastName, age, grade, email} = req.body;

    const msg = await studentController.updateStudent({id, firstName, lastName, age, grade, email});
    res.json({
      status: 200,
      message: msg
    });
  } catch (err) {
    res.json({
      status: err.code || err.statusCode || 500,
      message: err.message || 'Something went wrong while updating item hash!'
    });
  }
});

router.delete('/', async (req, res) => {
    try {
    const id = req.body.id;
      const msg = await studentController.deleteStudent(id);
      res.json({
        status: 200,
        message: msg
      });
    } catch (err) {
      res.json({
        status: err.code || err.statusCode || 500,
        message: err.message || 'Something went wrong while reading item from DB!'
      });
    }
  });

module.exports = router;