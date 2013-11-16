function route(handle, pathname, response, postData) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    handle["index"](response, postData);
  }
}

exports.route = route;