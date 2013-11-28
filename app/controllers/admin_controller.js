var helper = require("../../lib/helper"),
    db = require("../../lib/db"),
    Admin = require("../models/admin"),
    Idea = require("../models/idea");

function admin(response, request, params, postData) {
  Admin.getAll(function(admins) {
    Idea.getAll(function(ideas) {
      helper.render("admin/admin.html", { admins: admins, ideas: ideas }, response, 200);
    });
  });
}

function updateIdeas(response, request, params, postData) {
  Idea.getAll(function(ideas) {
    helper.render("admin/update_ideas.js", { ideas: ideas }, response, 200);
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

function logout(response, request, params, postData) {
  helper.signOut(request);
  helper.redirectTo("/", request, response);
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

function destroy(response, request, params, postData) {
  Admin.findById(params.id, function(admin) {
    if (admin) {
      var id = admin.id;
      admin.destroy(function() {
        helper.render("admin/destroy.js", { id: id }, response, 200);
      });
    } else {
      helper.render("admin/destroy.js", { id: null }, response, 200);
    }
  });
}

exports.admin = admin;
exports.updateIdeas = updateIdeas;
exports.login = login;
exports.logout = logout;
exports.createSession = createSession;
exports.destroy = destroy;