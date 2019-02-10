var mongojs = require('mongojs');

var db = mongojs ('localhost:27017/fakultet', ['student','mentor','odsijek']);

function student (id, ime , prezime, mentor_id,odsijek_id) {
  this.id = id;
  this.ime = ime;
  this.prezime = prezime;
  this.odsijek_id = odsijek_id;
  this.mentor_id= mentor_id;
};

function mentor (id, ime) {
  this.id = id;
  this.ime= ime;
};

function odsijek (id, naziv) {
  this.id = id;
  this.naziv= naziv;
};
module.exports = {db, student, mentor, odsijek};