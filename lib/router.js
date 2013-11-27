var helper = require("./helper");

function route(handle, pathname, request, response, postData, isAjax) {
  var r = handle[pathname];

  if ((typeof r) === 'object') {
    var method = request.method;

    if(r.accept.indexOf(method) != -1) {
      if(!r.ajaxOnly || (r.ajaxOnly && isAjax)) {
        r.action(response, request, postData);
      } else {
        helper.renderError(403, response);
      }
    } else {
      helper.renderError(405, response);
    }
  } else {
    helper.renderError(404, response);
  }
}

exports.route = route;