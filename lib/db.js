var pg = require('pg');

exports.perform_query = function (query, handler) {
  connect(function(client, done) {
    _recursive_queries(client, [[query, handler]], done);
  });
}

exports.perform_queries = function (queries) {
  connect(function(client, done) {
    _recursive_queries(client, queries, done);
  });
}

exports.perform_queries_async = function (queries) {
  var client = new pg.Client(process.env.DATABASE_URL);

  // http://stackoverflow.com/questions/20038825/asynchronous-database-queries-with-postgresql-in-node-not-working
  queries.forEach(function(q) {
    if((typeof q) === 'string') {
      q = [q, function(r) { return undefined; }];
    }

    client.query(q[0], function(err, result) {
      if(err) {
        console.log(err);
      } else {
        q[1](result);
      }
    });
  });

  client.on('drain', function() {
    console.log("drained");
    client.end();
  });

  client.connect();
}

function connect(callback) {
  pg.connect(process.env.DATABASE_URL, function(error, client, done) {
    if(error) {
      console.log(error);
    } else {
      callback(client, done);
    }
  });
}

function _recursive_queries(client, queries, done) {
  var q = queries.shift();

  var query
  var handler;

  if((typeof q) === 'string') {
    q = [q, function(r) { return undefined; }];
  }

  _query(client, q[0], function(result) {
    if(queries.length == 0) {
      done();
    } else {
      _recursive_queries(client, queries, done);
    }

    q[1](result);
  });
}

function _query(client, query, handler) {
  client.query(query, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      handler(result);
    }
  });
}