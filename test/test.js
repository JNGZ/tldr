const chai = require('chai');
const axios = require('axios');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const server = require('../server/server');

describe('test the server endpoints', ()=> {
    it('articles should respond successfully', (done) =>{
        chai.request(server)
        axios.post('/api/headlines', {
            params: {
                query: 'trump',
            }
        })
        .then((error, res) => {
            resolve( expect(error).to.not.exist,
            expect(res.status).to.equal(200),
            done())
        })
        .catch(error => console.log(error))
    })
})