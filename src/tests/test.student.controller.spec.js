const { expect } = require("chai");
const sinon = require("sinon");
const StudentController = require("../controllers/student.controller");
const Student = require("../models/student.model");

describe("Student Controller", function () {
    afterEach(() => {
        sinon.restore();
    });

    describe("createStudent", function () {
        it("should create a student successfully", async function () {
            const studentData = {
                firstName: "Alice",
                lastName: "Smith",
                age: 22,
                grade: "B",
                email: "alice.smith@example.com"
            };

            const createStub = sinon.stub(Student, "create").resolves();

            const result = await StudentController.createStudent(studentData);

            expect(createStub.calledOnce).to.be.true;
            expect(result).to.equal("Student created succesfully");
        });

        it("should throw an error if a required field is missing", async function () {
            const studentData = {
                firstName: "Alice",
                age: 22,
                grade: "B",
                email: "alice.smith@example.com"
            };

            try {
                await StudentController.createStudent(studentData);
            } catch (error) {
                expect(error.message).to.equal("All arguments are required: firstName, lastName, age, grade, email");
            }
        });

        it("should handle database errors gracefully", async function () {
            const studentData = {
                firstName: "Alice",
                lastName: "Smith",
                age: 22,
                grade: "B",
                email: "alice.smith@example.com"
            };

            const createStub = sinon.stub(Student, "create").rejects(new Error("Database error"));

            try {
                await StudentController.createStudent(studentData);
            } catch (error) {
                expect(error.message).to.equal("Database connection failed");
            }
        });
    });

    describe("readStudent", function () {
        it("should return a list of students", async function () {
            const mockStudents = [
                { id: 1, first_name: "John", last_name: "Doe", age: 20, grade: "A", email: "john.doe@example.com" },
                { id: 2, first_name: "Alice", last_name: "Smith", age: 22, grade: "B", email: "alice.smith@example.com" }
            ];

            const findAllStub = sinon.stub(Student, "findAll").resolves(mockStudents);

            const result = await StudentController.readStudent();

            expect(findAllStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockStudents);
        });

        it("should handle database errors gracefully", async function () {
            const findAllStub = sinon.stub(Student, "findAll").rejects(new Error("Database error"));

            try {
                await StudentController.readStudent();
            } catch (error) {
                expect(error.message).to.equal("Database connection failed");
            }
        });
    });

    describe("updateStudent", function () {
        it("should update a student successfully", async function () {
            const studentData = {
                id: 1,
                firstName: "Alice",
                lastName: "Smith",
                age: 23,
                grade: "A",
                email: "alice.smith@example.com"
            };

            const updateStub = sinon.stub(Student, "update").resolves([1]);

            const result = await StudentController.updateStudent(studentData);

            expect(updateStub.calledOnce).to.be.true;
            expect(result).to.equal("Student updated succesfully");
        });

        it("should throw an error if a required field is missing", async function () {
            const studentData = {
                id: 1,
                firstName: "Alice",
                age: 23,
                grade: "A",
                email: "alice.smith@example.com"
            };

            try {
                await StudentController.updateStudent(studentData);
            } catch (error) {
                expect(error.message).to.equal("All arguments are required: firstName, lastName, age, grade, email, id");
            }
        });

        it("should handle database errors gracefully", async function () {
            const studentData = {
                id: 1,
                firstName: "Alice",
                lastName: "Smith",
                age: 23,
                grade: "A",
                email: "alice.smith@example.com"
            };

            const updateStub = sinon.stub(Student, "update").rejects(new Error("Database error"));

            try {
                await StudentController.updateStudent(studentData);
            } catch (error) {
                expect(error.message).to.equal("Database connection failed");
            }
        });
    });

    describe("deleteStudent", function () {
        it("should delete a student successfully", async function () {
            const deleteStub = sinon.stub(Student, "destroy").resolves(1);  

            const result = await StudentController.deleteStudent(1);

            expect(deleteStub.calledOnce).to.be.true;
            expect(result).to.equal("Student deleted succesfully");
        });

        it("should throw an error if no ID is provided", async function () {
            try {
                await StudentController.deleteStudent();
            } catch (error) {
                expect(error.message).to.equal("id is required");
            }
        });

        it("should handle database errors gracefully", async function () {
            const deleteStub = sinon.stub(Student, "destroy").rejects(new Error("Database error"));

            try {
                await StudentController.deleteStudent(1);
            } catch (error) {
                expect(error.message).to.equal("Database connection failed");
            }
        });
    });
});
