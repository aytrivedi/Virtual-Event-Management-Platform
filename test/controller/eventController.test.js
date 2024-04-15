const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const server = require("../../app");
const { before } = require("mocha");

chai.use(chaiHttp);

describe("Test Events", () => {
  let signupBody1 = {
    email: "test3@example.com",
    password: "abc123",
    type: "USER",
  };
  let loginbody1 = {
    email: "test3@example.com",
    password: "abc123",
  };
  let signupBody2 = {
    email: "test4@example.com",
    password: "abc123",
    type: "ADMIN",
  };
  let loginbody2 = {
    email: "test4@example.com",
    password: "abc123",
  };
  let token = ''
  let token2 = ''
  let eventId=''
  let eventBody = {
    event_name: "Test Show",
    venue: "ABCD Auditorium",
    date: "2024-03-14",
    time: "19:00:00",
    seats: 30
  };

  let participant = 
  {
    email: "siddhartvaidya164@gmail.com",
    name: "Siddharth Vaidya",
    contact: "6266740889"
}
  

  before((done) => {
    chai.request(server).post("/users/register").send(signupBody1).end((err, res) => {
        chai.request(server).post("/users/login").send(loginbody1).end((err1, res1) => {
            token = res1.body.token
            done();
        })
      });
  });

  before((done) => {
    chai
      .request(server)
      .post("/users/register")
      .send(signupBody2)
      .end((err, res) => {
        chai
          .request(server)
          .post("/users/login")
          .send(loginbody2)
          .end((err1, res1) => {
            token2 = res1.body.token;
            done();
          });
      });
  });

  it("1. Get all Events", (done) => {
    chai
      .request(server)
      .get("/events")
      .set("authorization", 'Bearer '+ token)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });
  it("2. Without Authorization", (done) => {
    chai
      .request(server)
      .get("/events")
      .end((err, res) => {
        expect(res.status).equal(401);
        done();
      });
  });

  it("3. Post New Event But Forbidden User", (done) => {
    chai
    .request(server)
    .post("/events")
    .set("authorization", "Bearer "+token)
    .send(eventBody)
    .end((err, res) => {
        expect(res.status).equal(403);
        done()
    })
  })

  it("4. Post New Event", (done) =>{
    chai
      .request(server)
      .post("/events")
      .set("authorization", "Bearer " + token2)
      .send(eventBody)
      .end((err, res) => {
        expect(res.status).equal(201);
        eventId = res.body.data.eventId;
        done();
      });
  })

  it("4. Register For a New Event", (done) => {
    chai
      .request(server)
      .post(`/events/${eventId}/register`)
      .set("authorization", "Bearer " + token)
      .send(participant)
      .end((err, res) => {
        expect(res.status).equal(201);
        done();
      });
  });

  it("5. Update an Event", (done) =>{
    eventBody.seats = 10
    chai
      .request(server)
      .put(`/events/${eventId}`)
      .set("authorization", "Bearer " + token2)
      .send(eventBody)
      .end((err, res) => {
        expect(res.status).equal(201);
        done();
      });
  })

  it("6. Delete an Event", (done) => {
    chai
      .request(server)
      .delete(`/events/${eventId}`)
      .set("authorization", "Bearer " + token2)
      .end((err, res) => {
        expect(res.status).equal(201);
        done();
      });
  });

  
});
