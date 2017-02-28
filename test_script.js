const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
});

const do_q = (client, name) => {

  client.query(`SELECT * FROM famous_people  WHERE first_name = '${name}' OR last_name = '${name}'`, (err, result) => {

    console.log('Searching ...');
    if (err) {
      return console.error("error running query", err);
    }

    var data = result.rows;
    data.forEach((person) => {
      console.log(`Found ${data.length} Person(s) by the name '${name}': - ${person.id}: ${person.first_name} ${person.last_name}, born '${(person.birthdate).toLocaleString().slice(0, 9)}'`); //output: 1
    })

    client.end();
  })

};

client.connect((err) => {
  var name = process.argv[2];

  if (err) {
    return console.error("Connection Error", err);
  }

  do_q(client, name);
});
