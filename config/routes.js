var controller = require("../app/controller");

function routes() {
	var handle = {};
	handle["/submit"] = controller.submit;
	handle["index"] = controller.index;

	return handle;
}

exports.routes = routes;