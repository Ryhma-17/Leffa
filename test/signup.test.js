const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../index'); // Import your Express app

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
    it('should register a new user', (done) => {
        chai
            .request(app)
            .post('/account/register')
            .send({
                username: 'testuser',
                email: 'testemail',
                password: 'testpassword',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').equal('Account created successfully');
                done();
            });
    });

    it('should return a list of users', (done) => {
        chai
            .request(app)
            .get('/account/')
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    done(err);
                    return;
                }

                expect(res).to.have.status(200);

                // Handle empty response separately
                if (!res.text) {
                    console.log('Empty response');
                    done();
                    return;
                }

                expect(() => JSON.parse(res.text)).to.not.throw(); // Validate JSON parsing
                expect(JSON.parse(res.text)).to.be.an('array');
                done();
            });
    });
});

