var connect = require("connect"),
    url = require("url"),
    qs = require("querystring");

function start(route, handle, pub_url) {
  var app = connect();
  app.use(connect.static(pub_url));
  app.use(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var postData = "";

    console.log(request.method + ": '" + pathname + "' on " + new Date());
    console.log("  from: " + request.connection.remoteAddress);

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

  var port = process.env.PORT || 8000;
  app.listen(port);
}

exports.start = start;
