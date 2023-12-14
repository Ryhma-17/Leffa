const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../index'); 

chai.use(chaiHttp);
const expect = chai.expect;

// Yritetään kirjautua olemassa olevalla käyttäjällä

describe('User API', () => {
    it('should login to an existing account', (done) => {
        chai
            .request(app)
            .post('/account/login')
            .send({
                username: 'testi',
                email: 'testi@testi',
                password: 'testi',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Login successful');
                done();
            });
    });
});