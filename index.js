var server = require ("./server"),
    router = require("./router"),
    routes = require("./routes");

server.start(router.route, routes.routes());