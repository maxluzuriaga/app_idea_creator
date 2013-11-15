var http = require("http"),
    url = require("url");

function start(route, handle) {
  var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    route(handle, pathname, response, request)
  });

  server.listen(8000);
}

exports.start = start;
