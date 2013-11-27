var helper = require("../../lib/helper"),
    db = require("../../lib/db"),
    Admin = require("../models/admin");

function admin(response, request, postData){
  helper.isSignedIn(request, function(signedIn) {
    if (signedIn) {
      // render shit
    } else {
      helper.redirectTo("/login", request, response);
    }
  });
}

function login(response, request, postData) {
  helper.isSignedIn(request, function(signedIn) {
    if (signedIn) {
      helper.redirectTo("/admin", request, response);
    } else {
      // render sign in form
    }
  });
}

function createSession(response, request, postData) {
  
}

exports.admin = admin;
exports.login = login;
exports.createSession = createSession;