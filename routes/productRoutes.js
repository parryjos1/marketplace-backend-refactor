const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtSecret = process.env.JWTSECRET;




module.exports = function(app, passport, db) {

  // Connect to the Mongodb Atlas Database 
  MongoClient.connect('mongodb+srv://josh:tamarama7@marketplace-v3zcn.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, client) => {
    if( err ) return console.log(err);  // early return on error

    const marketplace = process.env['marketplace'] || 'marketplace';

    console.log( 'from productRoutes Using database:', marketplace );
    db = client.db( marketplace ); // success!
  });



  app.post('/products', (req, res) => {
    console.log(req.body);
    console.log('done');
    db.collection('products').find().toArray( (err, results) => {
      if(err){
        res.json({ error: err});
      } else {
        res.json( results );
      }
    });
  });


  app.get('/products', (req, res) => {
    console.log(req.body);
    console.log('done');
    db.collection('products').find().toArray( (err, results) => {
      if(err){
        res.json({ error: err});
      } else {
        res.json( results );
      }
    });
  });


}; // end of export
