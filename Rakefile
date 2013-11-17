namespace "db" do
  task :migrate do
    sh "./node_modules/.bin/db-migrate up --config config/database.json"
  end
  task :down do
    sh "./node_modules/.bin/db-migrate down --config config/database.json"
  end
end
