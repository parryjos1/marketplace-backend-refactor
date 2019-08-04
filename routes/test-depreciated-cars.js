// const express = require('express');
// const router = express.Router();
//
// router.get('/cars', ( req, res ) => {
//   res.status(200).json({message: 'Connected cars!' });
// })
//
// router.get('/test', ( req, res ) => {
//   res.status(200).json({message: 'Connected cars!' });
// })
//
//
// module.exports = router;


const express = require('express');
const router = express.Router();

router.get('/', ( req, res ) => {
  res.status(200).json({message: 'Connected cars!' });
  // console.log(req.body);
})
router.get('/test', ( req, res ) => {
  res.status(200).json({message: 'Connected cars cars!' });
  // console.log(req.body);
})


module.exports = router;
