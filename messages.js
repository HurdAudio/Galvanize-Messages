
'use strict';

const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

// YOUR CODE HERE

router.get('/', (req, res, next) => {
  console.log('HERE');
  knex.select('id', 'message', 'name')
  .from('messages')
  .orderBy('id')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  knex.select('id', 'message', 'name')
    .from('messages')
    .where('id', req.params.id)
    .first()
    .then((message) => {
      if (!message) {
        return next();
      }

      res.send(message);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  console.log('<POST></POST>');
  knex('messages')
  .insert({
    name: req.body.name,
    message: req.body.message
    }, '*')
  .then((result) => {
    var obj = {
       name: result[0].name,
       message: result[0].message
    };
    res.status(200).send(obj);
  })
  .catch((err) => {
    next(err);
  });
});


router.patch('/:id', (req, res, next) => {
  knex('messages')
    .update({
      name: req.body.name,
      message: req.body.message
    }, '*')
    .where('id', req.params.id)
    .then((result) => {
      var obj = {
        id: result[0].id,
        name: result[0].name,
        message: result[0].message
      };
      res.send(obj);
    })
    .catch((err) => {
      next(err);
    });
  });

  router.delete('/:id', (req, res, next) => {
    let record;

      knex('messages')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('messages')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            name: record.name,
            message: record.message
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
    });

module.exports = router;
