var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mymongo = require ('./mymongo.js');

/* GET movies listing. */
router.get('/', function(req, res, next) {
  mymongo.db.student.find({}, function (err, students) {
    res.send(students);
  });
});

router.get('/:id', function(req, res, next) {
  mymongo.db.student.findOne ({id:req.params.id}, function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
        console.log(result);
        res.send(result);
    }       

 } ) ;
});

router.post('/', function(req, res, next) {
  var student = new mymongo.student (req.body.id, req.body.ime,req.body.prezime, req.body.mentor_id,  req.body.odsijek_id);

  mymongo.db.student.save (student, function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
      
        res.send(result);
    }       

 } ) ;
});

router.put('/:id', function(req, res, next) {
  var student = new mymongo.student (req.body.id, req.body.ime,req.body.prezime, req.body.mentor_id,  req.body.odsijek_id);


  mymongo.db.student.findAndModify({

	  query: {id:req.params.id},
      update: {$set: student}
 },
  function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
      
        res.send(result);
    }       

 } ) ;
});

router.delete('/:id', function(req, res, next) {
  mymongo.db.student.remove({id:req.params.id}, function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
        console.log(result);
        res.send(result);
    }       

 } ) ;
});



module.exports = router;
