const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const name = process.argv[2]

knex.select('*')
.from('famous_people')
.where('first_name', '=', name)
// .andWhere('last_name', '=', name)
.then(function (result) {
  result.forEach(function (person) {
    console.log(person);
  });
})