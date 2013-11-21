var pg = require('pg');

exports.perform_query = function (query, values, handler) {
  connect(function(client, done) {
    _recursive_queries(client, [[query, values, handler]], done);
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
    q = _format(q);

    client.query(q[0], q[1], function(err, result) {
      if(err) {
        console.log(err);
      } else {
        q[2](result);
      }
    });
  });

  client.on('drain', function() {
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
  var q = _format(queries.shift());

  _query(client, q[0], q[1], function(result) {
    if(queries.length == 0) {
      done();
    } else {
      _recursive_queries(client, queries, done);
    }

    q[2](result);
  });
}

function _query(client, query, values, handler) {
  client.query(query, values, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      handler(result);
    }
  });
}

function _format(q) {
  if((typeof q) === 'string') {
    // if q is just a query
    q = [q, undefined, function(r) { return undefined; }];
  } else if((typeof q[1]) === 'function') {
    // [query, function]
    q[2] = q[1];
    q[1] = undefined;
  } else if((typeof q[1]) === 'object') {
    // [query, values]
    q[2] = function(r) { return undefined; };
  }

  return q;
}