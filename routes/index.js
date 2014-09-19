var express = require('express');
var router = express.Router();
var prettyjson = require('prettyjson');
var fs = require('fs');
var path = require('path');

var DATABASE_PATH = path.join(__dirname, '../api/db.json');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'ShowerTime' });
});

router.post('/add', function(req, res) {
  console.log('got a posttttt');
  var user = req.body.user;
  var time = req.body.time;
  console.log(user);
  console.log(time);
  if (addTime(user, time)) {
    res.status(200).end();
  } else {
    res.status(500).end();
  }
});


function addTime(user, duration) {
  var db = loadDatabase();
  if (db) {
    var userFromDbIndex = db.users.map(function (e) {return e.name}).indexOf(user);
    console.log(userFromDbIndex);
    if (userFromDbIndex != -1) {
        db.users[userFromDbIndex].showerTimes.push(duration);
    } else {
      console.log(user + " did not exist");
      db.users.push({
        "name": user,
        "showerTimes": [duration]
      });
    }
  }
  return updateDatabase(db);
}

function matchUser(element) {
  return element.name == this.name;
}

function loadDatabase() {
  console.log('fuck you loadDatabase');
  var db = fs.readFileSync(DATABASE_PATH, 'utf8');
  db = JSON.parse(db);
  return db;
}

function updateDatabase(db) {
  var success = true;
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(db, null, 4));
  return success;
}

module.exports = router;
