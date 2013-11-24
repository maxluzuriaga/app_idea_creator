var assert = require("assert"),
    db = require('../lib/db'),
    Idea = require('../app/models/idea.js');

process.env.DATABASE_URL = "postgres://postgres@localhost/app_idea_creator_test";

describe('Idea', function() {

  before(function(done) {
    db.reset(done);
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
      before(function() {
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
      before(function(done) {
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

  describe('#isSaved()', function() {
    var idea;

    before(function() {
      idea = new Idea();
      idea.name = "Testing testing testing.";
    });

    it('should return false when not saved', function() {
      assert(!idea.isSaved());
    });

    it('should return true when saved', function() {
      idea.save(function() {
        assert(idea.isSaved());
      });
    });
  });

  describe('#destroy()', function() {
    var idea;

    before(function(done) {
      idea = new Idea();
      idea.name = "Let's test the delete functionality!";
      idea.save(done);
    });

    it('should delete the idea', function(done) {
      var id = idea.id;
      idea.destroy(function() {
        Idea.find(id, function(i) {
          assert.equal(null, i);
          done();
        });
      });
    });
  });

  describe('.find()', function() {
    var idea;

    before(function(done) {
      idea = new Idea();
      idea.name = "Something";
      idea.save(function() {
        done();
      });
    });

    it('should find an idea correctly', function(done) {
      Idea.find(idea.id, function(i) {
        assert.equal(i.id, idea.id);
        assert.equal(i.name, idea.name);
        assert.equal(i.date.getTime(), idea.date.getTime());
        done();
      });
    });

    it('should return null when no ideas match', function(done) {
      Idea.find(Math.pow(2,13), function(i) {
        assert.equal(null, i);
        done();
      });
    });

  });

  describe('.count()', function() {
    var c;

    before(function(done) {
      db.reset(function() {
        c = Math.floor((Math.random()*10)+1);

        var ideas = [];
        for(var x=0; x<c; x++) {
          ideas.push(x);
        };

        ideas.forEach(function(i) {
          var idea = new Idea();
          idea.name = "New Idea " + i;
          idea.save(function() {
            if (i == c-1) {
              done();
            }
          });
        });
      });
    });

    it('should find the number of ideas correctly', function(done) {
      Idea.count(function(count) {
        assert.equal(count, c);
        done();
      });
    });
  });


});