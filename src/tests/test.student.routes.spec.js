const chai = require("chai");
const sinonChai = require("sinon-chai");
const request = require("supertest");
const rewire = require("rewire");
const { expect } = chai;

chai.use(sinonChai);

let app = rewire("../index");

describe("Testing routes", () => {
    describe("/GET /student", () => {
        it("should succeed", (done) => {
          request(app)
            .get("/student")
            .expect(200)
            .end((err, response) => {
              expect(response.body).to.have.property("message").to.equal("Students read successfully!");
              done(err);
            });
        });
      });
    
      describe("/POST /student", () => {
        it("should create a student", (done) => {
          const studentData = {
            firstName: "John",
            lastName: "Doe",
            age: 25,
            grade: "A",
            email: "john.doe@example.com"
          };
    
          request(app)
            .post("/student")
            .send(studentData)
            .expect(200)
            .end((err, response) => {
              expect(response.body).to.have.property("message").to.equal("Student created succesfully");
              done(err);
            });
        });
    
        it("should fail if required data is missing", (done) => {
          const studentData = {
            firstName: "John",
          };
    
          request(app)
            .post("/student")
            .send(studentData)
            .expect(500)
            .end((err, response) => {
              expect(response.body).to.have.property("message").to.include("All arguments are required");
              done(err);
            });
        });
      });
    
    
      describe("/PUT /student", () => {
        it("should update a student", (done) => {
          const studentData = {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            age: 26,
            grade: "A+",
            email: "john.doe_updated@example.com"
          };
    
          request(app)
            .put("/student")
            .send(studentData)
            .expect(200)
            .end((err, response) => {
              expect(response.body).to.have.property("message").to.equal("Student updated succesfully");
              done(err);
            });
        });
    
        it("should fail if required data is missing", (done) => {
          const studentData = {
            firstName: "John",
          };
    
          request(app)
            .put("/student")
            .send(studentData)
            .expect(500)
            .end((err, response) => {
              expect(response.body).to.have.property("message").to.include("All arguments are required");
              done(err);
            });
        });
      });
    
      describe("/DELETE /student", () => {
        it("should delete a student", (done) => {
          const studentId = { id: 1 };
    
          request(app)
            .delete("/student")
            .send(studentId)
            .expect(200)
            .end((err, response) => {
              expect(response.body).to.have.property("message").to.equal("Student deleted succesfully");
              done(err);
            });
        });
    
        it("should fail if no ID is provided", (done) => {
          const studentId = {};
    
          request(app)
            .delete("/student")
            .send(studentId)
            .expect(500)
            .end((err, response) => {
              expect(response.body).to.have.property("message").to.include("d is required");
              done(err);
            });
        });
      });
});
