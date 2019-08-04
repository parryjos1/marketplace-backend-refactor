const express = require('express');
const router = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
// const bodyParser = require('body-parser')

// create application/json parser
// const jsonParser = bodyParser.json()
//
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

MongoClient.connect('mongodb+srv://josh:tamarama7@marketplace-v3zcn.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, client) => {
  if( err ) return console.log(err);  // early return on error

  const marketplace = process.env['marketplace'] || 'marketplace';

  console.log( 'Using database:', marketplace );
  db = client.db( marketplace ); // success!
});


router.get('/', ( req, res ) => {
  // res.status(200).json({message: 'Connected to the products!' });
    db.collection('products').find().toArray( (err, results) => {
      if(err){
        res.json({ error: err});
      } else {
        res.json( results );
      }
    });
    // let search = req.body.headers.searchText
    // console.log(`Search Terms is: ${search}`);
    //
    // // req.db.collection('products').find().toArray( (err, results) => {
    // req.db.collection('products').find( { keywords: { $in: [`${search}`] } } ).toArray( (err, results) => {
    //   if( err ){
    //     res.json( { error: err });
    //   } else {
    //     console.log(res.body);
    //     res.json( results );
    //   }
    // });

})

router.post('/', ( req, res ) => {

  console.log(`req.body ${req.body}`);
  console.log(`req.body.headers ${req.body.headers}`);
  // console.log(`req.body.headers.searchText ${req.body.headers.searchText}`);
  console.log(`req.body.searchText ${req.body.searchText}`);
  console.log(`req.headers ${req.headers}`);
  console.log(`req.params ${req.params}`);
  console.log(`req.query ${req.query}`);
  console.log(`req.headers.headers ${req.headers.headers}`);
  // console.log(`req.headers.headers.searchText ${req.headers.headers.searchText}`);
  console.log(`req.headers.searchText ${req.headers.searchText}`);
  // console.log(req);
  console.log('Done');
  res.status(200).json({message: 'Connected products products!' });
  // console.log(req.body);
})
router.get('/test', ( req, res ) => {

  // console.log(`req.body ${req.body}`);
  // console.log(`req.headers ${req.headers}`);
  // console.log(`req.params ${req.params}`);
  // console.log('Done');
  res.status(200).json({message: 'Connected products products!' });
  // console.log(req.body);
})


module.exports = router;
