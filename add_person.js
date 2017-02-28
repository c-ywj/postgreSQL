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

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];

const insert = {first_name: firstName, last_name: lastName, birthdate: birthDate};

knex.insert(insert).into("famous_people")
.then(function (result) {
  console.log(result);
})
.finally(function () {
  knex.destroy();
})