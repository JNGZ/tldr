const chai = require('chai');
const axios = require('axios');
const moxios = require('moxios');
const chaiHttp = require('chai-http');
const sinon = require('sinon')
chai.use(chaiHttp);
const server = require('../server/server');
const equal = require('assert')
describe('test the server endpoints', ()=> {

    beforeEach(() => {
        moxios.install();
    })

    afterEach(() => {
        moxios.uninstall();
    })


    it('articles should respond successfully', (done) =>{
        moxios.withMock(()=>{
            chai.request(server)
            let onFulfilled = sinon.spy()
            axios.post('/api/headlines', {
                params: {
                    query: 'trump',
                }
            })
            .then(response => onFulfilled = response)
            .catch(error => console.log(error))
           moxios.wait(()=>{
               const request = moxios.requests.mostRecent();
               request.respondWith({
                   status: 200,
               })
               .then(()=>{
                   equal(onFulfilled.status, "200")
                   done()
               })
           })
        })
    })

    it('google sentiment analysis should respond successfully', (done) =>{
        moxios.withMock(()=>{
            chai.request(server)
            let onFulfilled = sinon.spy()
            let text = "No food is quite as summery as grilled food, but by the time late August rolls around, I’ll be damned if I’m going to eat another hot dog. Here we show you how to make a fancy, hot dog-free, three-course dinner on your grill, keeping your house cool and your "
            axios.post('/api/sentiment', {
                params: {
                    id: 1,
                    text: text
                }
            })
            .then(response => onFulfilled = response)
            .catch(error => console.log(error))
    
           moxios.wait(()=>{
               const request = moxios.requests.mostRecent();
               request.respondWith({
                   status: 200,
               })
               .then(()=>{
                   equal(onFulfilled.status, "200")
                   done()
               })
           })
        })
    })
})