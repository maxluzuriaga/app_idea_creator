var controller = require("../app/controller");

module.exports = {
  "/": {
    action: controller.index,
    accept: ["GET"]
  },
  "/submit": {
    action: controller.submit,
    accept: ["POST"]
  },
  "/count": {
    action: controller.count,
    accept: ["GET"],
    ajaxOnly: true
  }
}