var connect = require("connect"),
    url = require("url"),
    qs = require("querystring");

function start(route, handle) {
  var app = connect();
  app.use(connect.static('public'));
  app.use(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var postData = "";

    console.log(request.method + ": " + pathname);

    request.setEncoding('utf8');

    request.addListener("data", function(chunk) {
      postData += chunk;
    });

    request.addListener("end", function(chunk) {
      if (postData) {
        postData = qs.parse(postData);
        console.log(postData);
      };
      route(handle, pathname, request, response, postData);
    });
  });

  app.listen(8000);
}

exports.start = start;
