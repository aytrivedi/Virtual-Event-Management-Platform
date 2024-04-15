const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const server = require("../../app");
const { before } = require("mocha");

chai.use(chaiHttp);

describe("verify login", () => {
    let signupBody = {
      email: "test1@example.com",
      password: "abc123",
      type: 'USER'
    };
  let body = {
    email: "test1@example.com",
    password: "abc123"
  };

  before((done) =>{
    chai.request(server).post("/users/register").send(signupBody).end((err, res) =>{
        if(err){
            console.log(err)
        }
        done()
    })
  })

  it("1. successfull login", (done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if(err){
            console.log(err)
        }
        expect(res.status).equal(200);
        expect(res.body).to.haveOwnProperty('token')
        done();
      });
  });
  it("2. wrong password", (done) => {
    body.password = "djdj";
    chai
      .request(server)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.status).equal(401);
        done();
      });
  });
  it("3. wrong email", (done) => {
    body.email = "aa@gm.com";
    chai
      .request(server)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.status).equal(404);
        done();
      });
  });
  it("4. no email", (done) => {
    body.email = "";
    chai
      .request(server)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });
  it("5. no password", (done) => {
    body.email = 'test1@example.com';
    body.password = "";
    chai
      .request(server)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });
});
