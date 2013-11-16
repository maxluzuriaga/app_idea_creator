var server = require ("./lib/server"),
    router = require("./lib/router"),
    routes = require("./app/routes");

server.start(router.route, routes.routes());