var connect = require("connect"),
    url = require("url");

function start(route, handle) {
  var app = connect();
  app.use(connect.static('public'));
  app.use(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var postData = "";

    request.setEncoding('utf8');

    request.addListener("data", function(chunk) {
      postData += chunk;
    });

    request.addListener("end", function(chunk) {
      route(handle, pathname, response, postData);
    });
  });

  app.listen(8000);
}

exports.start = start;
