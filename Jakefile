var db = require("./lib/db.js")
process.env.DATABASE_URL = "postgres://postgres@localhost/app_idea_creator";

namespace('db', function() {
  desc('Migrate the database');
  task('migrate', function(env) {
    env = env || "dev"
    jake.exec(["./node_modules/.bin/db-migrate up --config config/database.json --env "+env], { printStdout: true});
  });

  desc('Migrate the database down');
  task('down', function(env) {
    env = env || "dev"
    jake.exec(["./node_modules/.bin/db-migrate dowb --config config/database.json --env "+env], { printStdout: true});
  });

  desc('Reset the database');
  task('reset', {async: true}, function() {
    db.reset(function() {
      complete();
    });
  });
});