const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');
const models = require('../models');

const { Todo } = models;

chai.use(chaiHttp);

describe('APIs', () => {
  beforeEach(async () => {
    await Todo.destroy({
      where: {},
      truncate: true,
    });
    await Todo.bulkCreate([
      { title: 'todo 1', position: 'a' },
      { title: 'todo 2', position: 'b', isDone: true },
      { title: 'todo 3', position: 'c' },
    ]);
  });

  describe('GET /todos', () => {
    it('should get a list of todos', (done) => {
      chai
        .request(server)
        .get('/todos')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf(3);
          expect(res.body).to.be.a('array');
          expect(res.body[1].title).to.equal('todo 2');
          expect(res.body[0].position).to.equal('a');
          done();
        });
    });
  });

  describe('POST /todos', () => {
    it('should post a todo', (done) => {
      const todo = { title: 'test todo' };
      chai
        .request(server)
        .post('/todos')
        .send(todo)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('position');
          expect(res.body).to.include({ title: 'test todo' });
          expect(res.body.createdAt).to.exist;
          expect(res.body.updatedAt).to.exist;
          done();
        });
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo', (done) => {
      Todo.findOne({ where: { title: 'todo 3' } }).then((todo) => {
        chai
          .request(server)
          .delete(`/todos/${todo.id}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
            done();
          });
      });
    });
  });

  describe('DELETE /todos', () => {
    it('should delete a completed todos', (done) => {
      chai
        .request(server)
        .delete('/todos')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  describe('PATCH /todos', () => {
    it('should update a todo with id', (done) => {
      Todo.findOne({ where: { title: 'todo 1' } }).then((todo) => {
        chai
          .request(server)
          .patch('/todos')
          .send({
            id: todo.id,
            isDone: !todo.isDone,
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body[0]).to.equal(1);
            done();
          });
      });
    });

    it('should update a todos', (done) => {
      chai
        .request(server)
        .patch('/todos')
        .send({
          isDone: true,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body[0]).to.equal(2);
          done();
        });
    });
  });
});
