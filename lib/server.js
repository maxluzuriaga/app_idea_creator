var connect = require("connect"),
    url = require("url"),
    qs = require("querystring");

function start(route, handle, pub_url) {
  var app = connect();
  app.use(connect.static(pub_url));
  app.use(connect.cookieParser());
  app.use(connect.cookieSession({ secret: 'testsecret', cookie: { maxAge: 60*60*60*1000 } }));
  app.use(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var isAjax = request.headers['x-requested-with'] == 'XMLHttpRequest';
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
      route(handle, pathname, request, response, postData, isAjax);
    });
  });

  var port = process.env.PORT || 8000;
  console.log("Starting application on port " + port);
  app.listen(port);
}

exports.start = start;
