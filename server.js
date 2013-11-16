var http = require("http"),
    url = require("url");

function start(route, handle) {
  var server = http.createServer(function(request, response) {
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

  server.listen(8000);
}

exports.start = start;
