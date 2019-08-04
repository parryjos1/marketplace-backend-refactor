


const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtSecret = process.env.JWTSECRET;


module.exports = function(app, passport) {

  app.post('/login', passport.authenticate('local'), function(req, res){
    // this is only reached if authentication is successful
    const token = jwt.sign({ id: req.user._id }, jwtSecret);
    res.json({
      status: 'success',
      token,
      email: req.user.email,
      name: req.user.name
    });

  });

};
