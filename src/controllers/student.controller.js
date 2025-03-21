const connection = require('../connection');
const Student = require('../models/student.model');
//await User.create({ name: "Alice", email: "alice@example.com" });
exports.createStudent = async function(studentObj){
    const {firstName, lastName, age, grade, email} = studentObj;
    if(!firstName || !lastName || !age || !grade || !email) {
        throw new Error('All arguments are required: firstName, lastName, age, grade, email');
    }
    try {
        await Student.create({first_name: firstName, last_name: lastName, age: age, grade: grade, email: email });
        return "Student created succesfully";        
    } catch (err) {
        console.error('Database query error:', err);
        throw new Error('Database connection failed');
    }
}
exports.readStudent = async function(){
    try {
        return await Student.findAll();
    } catch (err) {
        console.error('Database query error:', err);
        throw new Error('Database connection failed');
    }
}

exports.updateStudent = async function (studentObj) {
    const {id, firstName, lastName, age, grade, email} = studentObj;
    if(!firstName || !lastName || !age || !grade || !email || !id) {
        throw new Error('All arguments are required: firstName, lastName, age, grade, email, id');
    }
    try {
        await Student.update({first_name: firstName, last_name: lastName, age: age, greade: grade, email: email }, {where: {id: id}})
        return "Student updated succesfully";        
    } catch (err) {
        console.error('Database query error:', err);
        throw new Error('Database connection failed');
    }
}

exports.deleteStudent = async function (studentId) {
    const id = studentId;
    if(!id){
        throw new Error('d is required');
    }
    try {
        await Student.destroy({where: {id: id}});
        return "Student deleted succesfully";        
    } catch (err) {
        console.error('Database query error:', err);
        throw new Error ('Database connection failed');
    }
}