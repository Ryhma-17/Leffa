const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../index'); // Import your Express app

chai.use(chaiHttp);
const expect = chai.expect;

const randomUsername = generateRandomString(10);
const randomEmail = generateRandomString(8) + '@example.com';
const randomPassword = generateRandomString(12);

// Funktio luomaan satunnaiset stringit, jotta testi luo aina uuden käyttäjän

function generateRandomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

it('should register a new user', (done) => {
    chai
        .request(app)
        .post('/account/register')
        .send({
            username: randomUsername,
            email: randomEmail,
            password: randomPassword,
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


