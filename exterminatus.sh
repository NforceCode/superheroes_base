npx sequelize db:seed:undo:all
npx sequelize db:migrate:undo:all
rm sequelize-data.json
rm sequelize-meta.json
npx sequelize db:drop