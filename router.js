function route(handle, pathname, response, request) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    handle["index"](response, request);
  }
}

exports.route = route;