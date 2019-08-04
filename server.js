
const express = require('express');
const app = express();
var router = express.Router();
const PORT = process.env.PORT || 4000;

const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const bodyParser = require('body-parser')
require('dotenv').config()
console.log("MY_VARIABLE: " + process.env.MY_VARIABLE); // DELETE????

//
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
//
// // parse application/json
// app.use(bodyParser.json())
// app.use(express.json()); // to support JSON-encoded bodies (form data)
// app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies (for formdata)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()); //And so on.
//
// app.use(express.json());
// app.use(express.urlencoded());
app.use(cors()); // this has to be called before routes
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser
// require('./passport')(passport) //this is to the passport.js

// ROUTES - Require Routes defined in directory
// const carsRoutes = require('./routes/cars')
// const productsRoutes = require('./routes/products')

// ROUTES - use routes defined in directory
// app.use('/cars', carsRoutes);
// app.use('/products', productsRoutes);






const { MongoClient, ObjectID } = require('mongodb');


let db; // global var to store the db connection object

MongoClient.connect('mongodb+srv://josh:tamarama7@marketplace-v3zcn.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, client) => {
  if( err ) return console.log(err);  // early return on error

  const marketplace = process.env['marketplace'] || 'marketplace';

  console.log( 'Using database:', marketplace );
  db = client.db( marketplace ); // success!
});

const productRoutes = require('./routes/productRoutes')(app, passport);
const authRoutes = require('./routes/authRoutes')(app, passport);




// Authentication

//give Passport the User's id to store
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

//Fetch the user from the database given an id
passport.deserializeUser(function(email, done) {
  db.collection('users')({ email: email }, (err, user) => done(err, user));
});

const LocalStrategy = require("passport-local").Strategy;
passport.use( new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    console.log('IN STRATEGY', email);

       db.collection('users').findOne({ email: email}, (err, user) => {
         if (err) { console.log('err!', err); return done(err); }
           if (!user) {
             console.log('no user ERROR');
             return done(null, false, { message: 'Incorrect username or password.' });
           }

           bcrypt.compare(password, user.password, (err, success) => {

             console.log('LOGIN CHECK AUTH', {err, success}, password, user.password);

              if( success ){
                console.log('all good????');
                return done(null, user);



              } else {
                console.log('wrong password!', err);
                return done(err);
              }

           });

       });

  } // strategy callback
));


// Passport JWT Strategy for checking tokens provided via AJAX requests,
// to protect routes only available to logged-in users

const {Strategy:JwtStrategy, ExtractJwt} = require("passport-jwt");
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

require('dotenv').config()
const jwtSecret = process.env.JWTSECRET; // TODO: extract this

//use jwtStrategy to determing if user has a valid JWT token
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
};
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('hello from JWT STrategy');
  console.log('*******jwt_payload:', jwt_payload);
  db.collection('users').findOne({'_id': new ObjectID(jwt_payload.id)}, (err, user) => {
      if (err) {
        console.log("err from JWT strategy (MongoDB query):", err);
        return done(err, false);
      }
      if (user) {
        console.log('Success from JWT Strategy', user);
        return done(null, user);
      } else {
        console.log('not sure what this is but it failed');
        return done(null, false);
      }
  });
 }));





app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})

// Test route
app.get('/', (req, res) => {
  // res.send('hello')
  res.json({status: 'good'})
})



// Example of how you would make a get request traditionally without router
// app.get('/mongoProducts', (req, res) => {
//   db.collection('products').find().toArray( (err, results) => {
//     if(err){
//       res.json({ error: err});
//     } else {
//       res.json( results );
//     }
//   });
// });


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` //
// ROUTES //

// Products Post
// app.post('/products', (req, res) => {
//   console.log(req.body);
//   console.log('done');
//   db.collection('products').find().toArray( (err, results) => {
//     if(err){
//       res.json({ error: err});
//     } else {
//       res.json( results );
//     }
//   });
// });

// app.get('/lemon', (req, res) => {
//   res.json("hello from the lemon")
// })
