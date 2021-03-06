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
  "/delete_idea": {
    action: ideas_controller.destroy,
    accept: ["GET", "POST"],
    adminOnly: true
  },

  "/admin": {
    action: admin_controller.admin,
    accept: ["GET"],
    adminOnly: true
  },
  "/update_ideas": {
    action: admin_controller.updateIdeas,
    accept: ["GET"],
    ajaxOnly: true,
    adminOnly: true
  },
  "/login": {
    action: admin_controller.login,
    accept: ["GET"]
  },
  "/logout": {
    action: admin_controller.logout,
    accept: ["GET"],
    adminOnly: true
  },
  "/create_session": {
    action: admin_controller.createSession,
    accept: ["POST"],
    secure: true
  },
  "/delete_admin": {
    action: admin_controller.destroy,
    accept: ["GET", "POST"],
    adminOnly: true
  }
}