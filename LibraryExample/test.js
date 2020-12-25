var assert = require('assert');
const { title } = require('process');

const request = require('supertest');
const app = require('./app.js');
const appSQL = require('./appSql.js')

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
    });
    it('book add in list', async ()=>{//aggiunta libro in lista
        const {body,status} = await request(app).post('/books').set('Accept', 'application/json').send({title:"pippo", number:2010,borrowed:true})
        status.should.equal(200) 
    });
});

describe('DELETE', ()=>{
    it('student deleted', async ()=>{//rimozione studente dalla lista
        const {body,status} = await request(app).delete('/students').set('Accept', 'application/json').send({ID:201})
        status.should.equal(200) 
    });
    it('book deleted', async ()=>{//rimozione libro dalla lista
        const {body,status} = await request(app).delete('/books').set('Accept', 'application/json').send({number:2010})
        status.should.equal(200) 
    });
});


//testing API con query
describe('GET /library', () => {
    // it('creating DB ', (done) => {//creazione db,TESTATA!
    //   request(appSQL)
    //       .get('/library/create_db')
    //       .set('Accept', 'application/json')
    //       .expect(200)
    //       .end(function(err, res) {
    //           if (err) return done(err);
    //           done(); 
    //     });
    // });

    // it('creating table students', (done) => {//creazione table,TESTATA!
    //   request(appSQL)
    //       .get('/library/students_table')
    //       .set('Accept', 'application/json')
    //       .expect(200)
    //       .end(function(err, res) {
    //           if (err) return done(err);
    //           done(); 
    //     });
    // });

    // it('creating table books', (done) => {//creazione table,TESTATA!
    //   request(appSQL)
    //       .get('/library/books_table')
    //       .set('Accept', 'application/json')
    //       .expect(200)
    //       .end(function(err, res) {
    //           if (err) return done(err);
    //           done(); 
    //     });
    // });
}) 

describe('POST', ()=>{
    // it('student add in db', async ()=>{//aggiunta studente in db,FUNZIONA!
    //     const {body,status} = await request(appSQL).post('/library/students_insert').set('Accept', 'application/json').send({name:"Francesco", surname:"sacco", district:"informatica",ID:108,HaveBooks:true})
    //     console.log(body)
    //     status.should.equal(200)
    // });

    it('book add in db', async ()=>{//aggiunta libro in db,FUNZIONA!
        const {body,status} = await request(appSQL).post('/library/books_insert').set('Accept', 'application/json').send({title:"topolino", number:1908, borrowed:1})
        console.log(body)
        status.should.equal(200)
    });
})