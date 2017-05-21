'use strict';

process.env.NODE_ENV = 'test';

let Thing = require('./thing.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');

// Init
chai.should();
chai.use(chaiHttp);

describe('Things', () => {

  beforeEach(() => {
    return Thing.remove({});
  });

  describe('/GET things', () => {
    it('it should GET all the things', () => {
      return chai.request(server)
        .get('/api/things')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        });
    });
  });
  describe('/POST book', () => {
    it('it should not POST a thing without name field', () => {
      return chai.request(server)
        .post('/api/things')
        .send({})
        .catch((err) => {
          err.should.have.status(400);
          err.should.have.property('response');
          err.response.should.have.property('text');
          err.response.text.should.be.a('string');
          err.response.text.should.eql('name is missing');
        });
    });
    it('it should POST a thing', () => {
      const thing = {
        name: 'a thing'
      };
      return chai.request(server)
        .post('/api/things')
        .send(thing)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
        });
    });
  });
  //describe('/GET/:id book', () => {
  //  it('it should GET a book by the given id', (done) => {
  //    let book = new Thing({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
  //    book.save((err, book) => {
  //      chai.request(server)
  //        .get('/book/' + book.id)
  //        .send(book)
  //        .end((err, res) => {
  //          res.should.have.status(200);
  //          res.body.should.be.a('object');
  //          res.body.should.have.property('title');
  //          res.body.should.have.property('author');
  //          res.body.should.have.property('pages');
  //          res.body.should.have.property('year');
  //          res.body.should.have.property('_id').eql(book.id);
  //          done();
  //        });
  //    });
  //
  //  });
  //});
  //describe('/PUT/:id book', () => {
  //  it('it should UPDATE a book given the id', (done) => {
  //    let book = new Thing({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
  //    book.save((err, book) => {
  //      chai.request(server)
  //        .put('/book/' + book.id)
  //        .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
  //        .end((err, res) => {
  //          res.should.have.status(200);
  //          res.body.should.be.a('object');
  //          res.body.should.have.property('message').eql('Book updated!');
  //          res.body.book.should.have.property('year').eql(1950);
  //          done();
  //        });
  //    });
  //  });
  //});
  ///*
  // * Test the /DELETE/:id route
  // */
  //describe('/DELETE/:id book', () => {
  //  it('it should DELETE a book given the id', (done) => {
  //    let book = new Thing({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
  //    book.save((err, book) => {
  //      chai.request(server)
  //        .delete('/book/' + book.id)
  //        .end((err, res) => {
  //          res.should.have.status(200);
  //          res.body.should.be.a('object');
  //          res.body.should.have.property('message').eql('Book successfully deleted!');
  //          res.body.result.should.have.property('ok').eql(1);
  //          res.body.result.should.have.property('n').eql(1);
  //          done();
  //        });
  //    });
  //  });
  //});
});
