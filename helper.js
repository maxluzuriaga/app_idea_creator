var ejs = require("ejs"),
    fs = require('fs');

function render(location, data, response, status) {
  var file = "./views/" + location + ".html.ejs";
  fs.readFile(file, 'utf8', function(err, template) {
    if (err) {
      console.log(err);
    } else {
      var body = ejs.render(template, data);
      response.writeHead(status, {"Content-Type" : "text/html"});
      response.write(body);
      response.end();
    }
  });
}

exports.render = render;