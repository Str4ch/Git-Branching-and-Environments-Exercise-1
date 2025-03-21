const { expect } = require("chai");
const sinon = require("sinon");
const SequelizeMock = require("sequelize-mock");
const StudentModel = require("../models/student.model");

const dbMock = new SequelizeMock();
const Student = dbMock.define("students", {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    age: 20,
    grade: "A",
    email: "john.doe@example.com"
});

describe("Student Model test", function () {

    afterEach(() => {
        sinon.restore();
    });

    it("should create a student successfully", async function () {
        const studentData = {
            first_name: "Alice",
            last_name: "Smith",
            age: 22,
            grade: "B",
            email: "alice.smith@example.com"
        };

        const createdStudent = await Student.create(studentData);

        expect(createdStudent.first_name).to.equal(studentData.first_name);
        expect(createdStudent.last_name).to.equal(studentData.last_name);
        expect(createdStudent.age).to.equal(studentData.age);
        expect(createdStudent.grade).to.equal(studentData.grade);
        expect(createdStudent.email).to.equal(studentData.email);
    });

    it("should find a student by id", async function () {
        const findStub = sinon.stub(Student, "findOne").resolves({
            id: 1,
            first_name: "John",
            last_name: "Doe",
            age: 20,
            grade: "A",
            email: "john.doe@example.com"
        });

        const student = await Student.findOne({ where: { id: 1 } });

        expect(findStub.calledOnce).to.be.true;
        
        expect(student.first_name).to.equal("John");
        expect(student.last_name).to.equal("Doe");
        expect(student.age).to.equal(20);
        expect(student.grade).to.equal("A");
        expect(student.email).to.equal("john.doe@example.com");
    });

    it("should update a student's age", async function () {
        const updateStub = sinon.stub(Student, "update").resolves([1]);

        const updatedRows = await Student.update({ age: 21 }, { where: { id: 1 } });

        expect(updateStub.calledOnce).to.be.true;
        expect(updatedRows[0]).to.equal(1);
    });

    it("should delete a student by ID", async function () {
        const deleteStub = sinon.stub(Student, "destroy").resolves(1); 
        const deletedRows = await Student.destroy({ where: { id: 1 } });

        expect(deleteStub.calledOnce).to.be.true;
        expect(deletedRows).to.equal(1);
    });
});
