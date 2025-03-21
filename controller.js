const connection = require('./connection');

exports.createStudent = async function(studentObj){
    const {firstName, lastName, age, grade, email} = studentObj;
    if(!firstName || !lastName || !age || !grade || !email) {
        throw new Error('All arguments are required: firstName, lastName, age, grade, email');
    }
    try {
        connection.query(`INSERT INTO students (first_name,last_name, age, grade, email )
             VALUES ('${firstName}', '${lastName}', ${age}, '${grade}', '${email}')`);
        return "Student created succesfully";        
    } catch (err) {
        console.error('Database query error:', err);
        throw new Error('Database connection failed');
    }
}
exports.readStudent = async function(){
    try {
        const result = connection.query('SELECT * from students');
        const data = await result.then();
        return data.rows;
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
        connection.query(`UPDATE students 
                          SET first_name = '${firstName}', last_name = '${lastName}', grade = '${grade}', age = ${age}, email = '${email}'
                          WHERE id = ${id};`);
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
        connection.query(`DELETE FROM students
                          WHERE id = ${id};`);
        return "Student deleted succesfully";        
    } catch (err) {
        console.error('Database query error:', err);
        throw new Error ('Database connection failed');
    }
}