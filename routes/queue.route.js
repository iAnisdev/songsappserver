var express = require('express');
var router = express.Router();

const { body, check,validationResult} = require('express-validator');

const queueModel = require('./../models/queue.model')


router.get('/queue',function(req, res, next) {
    queueModel.find({} , function(err , result) {
        if(err) {
            res.status(400).json({
              err
            })
          }
          res.json(result)
    })
});

router.get('/queue/:id',  function(req, res, next) {
    queueModel.findOne({ _id: req.params.id} , function(err , result) {
        if(err) {
            res.status(400).json({
              err
            })
          }
          res.json(result)
    })
});

router.post('/queue',  check('title').exists().not().isEmpty().withMessage('Song Title Required for adding to Queue'), 
check('artist').exists().not().isEmpty().withMessage('Song Artist Required for adding to Queue') , function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({
        errors
    });
    }
    var newQueue = new queueModel({
        title: req.body.title,
        artist: req.body.artist
      })
      newQueue.save( async function(err , result){
          if(err) {
            res.status(400).json({
              err
            })
          }
          res.json(result)
      })
});

router.delete('/queue/:id', function(req, res, next) {
    queueModel.deleteOne({_id: req.params.id }, function (err, result) {
        if(err){
          res.status(400).json({
            err
          });
        }
        res.json(result)
    });
});

module.exports = router;