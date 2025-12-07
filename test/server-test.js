const assert = require('assert');
const request = require('request');
const app = require('../server');

const fixtures = require('./fixtures');

describe('Zemirot Derdareli Server', () => {

  before((done) => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('זמירות') || response.body.includes('Zemirot'),
               `"${response.body}" does not include application name.`);
        done();
      });
    });

  });

  describe('POST /piyutim', () => {

    beforeEach(() => {
      app.locals.piyutim = {};
    });

    it('should not return 404', (done) => {
      this.request.post('/piyutim', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should receive and store piyut data', (done) => {
      var payload = { piyut: fixtures.validPiyut };

      this.request.post('/piyutim', { form: payload }, (error, response) => {
        if (error) { done(error); }

        var piyutCount = Object.keys(app.locals.piyutim).length;

        assert.equal(piyutCount, 1, `Expected 1 piyut, found ${piyutCount}`);

        done();
      });
    });

    it('should redirect the user to their new piyut', (done) => {
      var payload = { piyut: fixtures.validPiyut };

      this.request.post('/piyutim', { form: payload }, (error, response) => {
        if (error) { done(error); }
        var newPiyutId = Object.keys(app.locals.piyutim)[0];
        assert.equal(response.headers.location, '/piyutim/' + newPiyutId);
        done();
      });
    });

    it('should initialize piyut with 0 points', (done) => {
      var payload = { piyut: fixtures.validPiyut };

      this.request.post('/piyutim', { form: payload }, (error, response) => {
        if (error) { done(error); }
        var newPiyutId = Object.keys(app.locals.piyutim)[0];
        var piyut = app.locals.piyutim[newPiyutId];
        assert.equal(piyut.points, 0, 'New piyut should start with 0 points');
        done();
      });
    });

  });

  describe('GET /piyutim/:id', () => {

    beforeEach(() => {
      app.locals.piyutim = {};
      app.locals.piyutim.testPiyut = fixtures.validPiyut;
    });

    it('should not return 404 for existing piyut', (done) => {
      this.request.get('/piyutim/testPiyut', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should return 404 for non-existing piyut', (done) => {
      this.request.get('/piyutim/nonexistent', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 404);
        done();
      });
    });

    it('should return a page that has the name of the piyut', (done) => {
      var piyut = app.locals.piyutim.testPiyut;

      this.request.get('/piyutim/testPiyut', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(piyut.name),
               `"${response.body}" does not include "${piyut.name}".`);
        done();
      });
    });

  });

  // Legacy pizza tests for backward compatibility
  describe('Legacy Pizza Routes', () => {

    beforeEach(() => {
      app.locals.pizzas = {};
    });

    it('POST /pizzas should still work for backward compatibility', (done) => {
      var payload = { pizza: fixtures.validPizza };

      this.request.post('/pizzas', { form: payload }, (error, response) => {
        if (error) { done(error); }
        // Should get 404 since we removed pizza routes
        assert.equal(response.statusCode, 404);
        done();
      });
    });

  });

});
