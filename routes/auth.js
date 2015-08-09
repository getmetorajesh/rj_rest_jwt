var jwt = require('jwt-simple');

var auth = {
  login: function(req, res){
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({'status':401, 'message': 'Invalid Credentials'});
      return;
    }
    // query db to check if credentials are valid
    var dbUserObj = auth.validate(username, password);

    if (!dbUserObj) {
      res.status(401);
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      });
      return;
    }

    if(dbUserObj){
      // then lets generate a token
      res.json(genToken(dbUserObj));
    }
  },
  validate: function(username, password){
    var dbUserObj = { // dummy user obj
      name: 'raj',
      role: 'admin',
      username: 'raj'
    };
    return dbUserObj;
  },

  validateUser: function(username){
      var dbUserObj = {
        name: 'raj',
        role: 'admin',
        username: 'raj'
      };
      return dbUserObj;
  }
};


//private
function genToken(user){
  var expires = expiresIn(7);
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
}

function expiresIn(numDays){
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
