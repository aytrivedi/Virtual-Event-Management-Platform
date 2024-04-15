const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const server = require('../../app')

chai.use(chaiHttp)

describe('verify signup', ()=>{
    let body = {
        email: 'test@example.com',
        password: 'abc123',
        type: 'USER'
    }
    
    it('success', (done) =>{
        chai
        .request(server)
        .post('/users/register')
        .send(body)
        .end((err, res) =>{
            expect(res.status).equal(201)
            done()
        })
    })
    it("no email", (done) => {
      body.email = '';
      chai
        .request(server)
        .post("/users/register")
        .send(body)
        .end((err, res) => {
          expect(res.status).equal(400);
          done();
        });
    });
})