var helper = require("../../lib/helper"),
    db = require("../../lib/db"),
    Admin = require("../models/admin"),
    Idea = require("../models/idea");

function admin(response, request, params, postData) {
  helper.isSignedIn(request, function(signedIn) {
    if (signedIn) {
      Admin.getAll(function(admins) {
        Idea.getAll(function(ideas) {
          helper.render("admin/admin.html", { admins: admins, ideas: ideas }, response, 200);
        });
      });
    } else {
      helper.redirectTo("/login", request, response);
    }
  });
}

function login(response, request, params, postData) {
  helper.isSignedIn(request, function(signedIn) {
    if (signedIn) {
      helper.redirectTo("/admin", request, response);
    } else {
      helper.render("admin/login.html", null, response, 200);
    }
  });
}

function createSession(response, request, params, postData) {
  var username = postData.username;
  var password = postData.password;

  Admin.authenticate(username, password, function(authenticated) {
    if (authenticated) {
      helper.signIn(username, request);
      helper.redirectTo("/admin", request, response);
    } else {
      helper.redirectTo("/login", request, response);
    }
  });
}

exports.admin = admin;
exports.login = login;
exports.createSession = createSession;