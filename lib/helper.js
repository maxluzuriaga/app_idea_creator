var ejs = require("ejs"),
    fs = require('fs');

var types = {
  "html": "html",
  "js": "javascript"
};

function render(location, data, response, status) {
  var file = "./app/views/" + location + ".ejs";

  if((typeof data) == "object") {
    data["filename"] = file;
  } else {
    data = {
      filename: _dirname + file
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
    }
  });
}

exports.render = render;