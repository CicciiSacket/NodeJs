var assert = require('assert');
const { title } = require('process');

const request = require('supertest');
const app = require('./app.js');

var chai = require('chai').should();

describe('GET /books', () => {
    it('list of total books ', (done) => {//lista totale dei libri
      request(app)
          .get('/books')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
              if (err) return done(err);
              done(); 
        });
    }); 
    it('book found', async () =>{//libro per titolo
        const {body, status} = await request(app).get('/single_book').set('Accept', 'application/json').send({title:"Python"})
        status.should.equal(200) 
        body.should.have.property('title')
    });
    it('list of borrowed books ', (done) => {//libri che sono in prestito
        request(app)
            .get('/borrowed_books')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
        });
    }); 
});

describe('GET /students', () => {
    it('list of total students ', (done) => {//lista totale degli studenti
      request(app)
          .get('/students')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
              if (err) return done(err);
              done(); 
        });
    }); 
    it('student found', async () =>{//studente per matricola
        const {body, status} = await request(app).get('/single_student').set('Accept', 'application/json').send({ID:108})
        status.should.equal(200) 
        body.should.have.property('ID')
    });
    it('list of students have\'s books ', (done) => {//studenti in possesso di un libro
        request(app)
            .get('/students_books')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
        });
    }); 
});

describe('POST', ()=>{
    it('student add in list', async ()=>{//aggiunta studente in lista
        const {body,status} = await request(app).post('/students').set('Accept', 'application/json').send({name:"pippo", surname:"pluto", district:"infermeria",ID:201,haveBook:true})
        status.should.equal(200) 
        // console.log(body)
    });
    it('book add in list', async ()=>{//aggiunta libro in lista
        const {body,status} = await request(app).post('/books').set('Accept', 'application/json').send({title:"pippo", number:2010,borrowed:true})
        status.should.equal(200) 
        // console.log(body)
    });
});

describe('DELETE', ()=>{
    it('student delete', async ()=>{
        const {body,status} = await request(app).delete('/students').set('Accept', 'application/json').send({ID:101})
        status.should.equal(200) 
        console.log(body)
    });
});
