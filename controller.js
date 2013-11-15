function index(response) {
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.write("Index");
  response.end();
}

function submit(response, request) {
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.write("Submit");
  response.end();
}

exports.index = index;
exports.submit = submit;