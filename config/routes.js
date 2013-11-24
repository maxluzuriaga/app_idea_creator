var controller = require("../app/controller"),
    helper = require("../lib/helper");

module.exports = {
  "/": {
    action: controller.index,
    accept: ["GET"]
  },
  "/submit": {
    action: controller.submit,
    accept: ["POST"]
  },
  404: {
    action: function index(response) {
      helper.render("404.html", null, response, 404);
    }
  }
}