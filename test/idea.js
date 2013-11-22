var assert = require("assert"),
    db = require('../lib/db'),
    Idea = require('../app/models/idea.js');

process.env.DATABASE_URL = "postgres://postgres@localhost/app_idea_creator_test";

describe('Idea', function() {
  before(function(done) {
    db.perform_query('DELETE FROM ideas', function() {
      done();
    });
  });

  describe('#new()', function() {
    it('should initialize an idea with empty values', function() {
      var idea = new Idea();
      assert.equal(-1, idea.id);
      assert.equal(null, idea.name);
      assert.equal(null, idea.date);
    });

    it('should initialize an idea with correct values', function() {
      var d = new Date();
      var idea = new Idea({
        id: 1,
        name: "test",
        date: d
      });

      assert.equal(1, idea.id);
      assert.equal("test", idea.name);
      assert.equal(d, idea.date);
    });
  });

  describe('#save()', function() {
    var idea;

    describe('when new', function() {
      beforeEach(function() {
        idea = new Idea();
        idea.name = "Testing testing testing.";
      });

      it('should save', function(done) {
        idea.save(function() {
          done();
        });
      });

      it('should set variables', function(done) {
        idea.save(function() {
          assert.notEqual(-1, idea.id);
          assert.notEqual(null, idea.date);
          done();
        });
      });
    });

    describe('when saved', function() {
      beforeEach(function(done) {
        idea = new Idea();
        idea.name = "Testing testing testing.";
        idea.save(function() {
          done();
        });
      });

      it('should save', function(done) {
        idea.save(function() {
          done();
        });
      });

      it('should update', function(done) {
        var n = "blah blah blah";
        idea.name = n;
        idea.save(function() {
          Idea.find(idea.id, function(i) {
            assert.equal(n, i.name);
            done();
          });
        });
      });

      it('should reset variables', function(done) {
        var n = "blah blah blah";
        idea.name = n;
        var d = idea.date;
        var id = idea.id;
        idea.save(function() {
          assert.equal(id, idea.id);
          assert.equal(n, idea.name);
          assert.notEqual(d, idea.date);
          done();
        });
      });
    });
  });
});