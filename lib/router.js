function route(handle, pathname, request, response, postData) {
  var r = handle[pathname];

  if ((typeof r) === 'object') {
    var method = request.method;
    if(r.accept.indexOf(method) != -1) {
      handle[pathname].action(response, postData);
    } else {
      response.end('BLAH');
      // TODO: handle wrong request type page
    }
  } else {
    handle["index"].action(response, postData);
    // TODO: display 404 page
  }
}

exports.route = route;