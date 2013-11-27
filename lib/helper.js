var ejs = require("ejs"),
    fs = require('fs'),
    Admin = require("../app/models/admin");

var types = {
  "html": "html",
  "js": "javascript"
};

function render(location, data, response, status) {
  var file = "./app/views/" + location + ".ejs";

  if(data != null) {
    data["filename"] = file;
  } else {
    data = {
      filename: file
    };
  }

  fs.readFile(file, 'utf8', function(err, template) {
    if (err) {
      console.log(err);
    } else {
      var body = ejs.render(template, data);
      response.writeHead(status, {"Content-Type" : "text/" + types[location.split(".")[1]] });
      response.write(body);
      response.end();

      console.log("  Rendered 'views/" + location + ".ejs' (" + status + ")\n");
    }
  });
}

function renderError(code, response) {
  render("errors/" + code + ".html", null, response, code);
}

function redirectTo(path, request, response) {
  console.log("  Redirecting to '" + path + "' (" + 301 + ")\n");

  var baseUrl = request.headers.host;

  response.writeHead(301,
    { Location: 'http://' + baseUrl + path }
  );
  response.end();
}

function signIn(username, request) {
  request.session.username = username;
}

function isSignedIn(request, handler) {
  var username = request.session.username;

  if(username == undefined) {
    handler(false);
  } else {
    Admin.find(username, function(admin) {
      if(admin) {
        handler(true);
      } else {
        handler(false);
      }
    });
  }
}

exports.render = render;
exports.renderError = renderError;
exports.redirectTo = redirectTo;
exports.signIn = signIn;
exports.isSignedIn = isSignedIn;