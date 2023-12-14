/*const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
    let authToken; 

   
    before(async () => {
        const response = await chai
            .request(app)
            .post('/account/login')
            .send({
                username: 'testi',
                password: 'testi',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Login successful');
                authToken = response.body.token;
                console.log('authToken:', authToken);
                done();
            });
     
    });

    it('should delete the user account', (done) => {
        chai
            .request(app)
            .delete('/account/delete')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Account deleted successfully');
                done();
            });
    });
});*/