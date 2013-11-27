var ideas_controller = require("../app/controllers/ideas_controller"),
    admin_controller = require("../app/controllers/admin_controller");

module.exports = {
  "/": {
    action: ideas_controller.index,
    accept: ["GET"]
  },
  "/submit": {
    action: ideas_controller.submit,
    accept: ["POST"]
  },
  "/count": {
    action: ideas_controller.count,
    accept: ["GET"],
    ajaxOnly: true
  },

  "/admin": {
    action: admin_controller.admin,
    accept: ["GET"]
  },
  "/login": {
    action: admin_controller.login,
    accept: ["GET"]
  },
  "/create_session": {
    action: admin_controller.createSession,
    accept: ["POST"],
    secure: true
  }
}