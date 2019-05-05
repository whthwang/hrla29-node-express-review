const router = require('express').Router(); //this needs to be set up for the router.
const controller = require('./controller.js');

router
  .route('/todoList')
  .get(controller.get)
  .post(controller.post)
  .delete(controller.delete)

// router      do this if we have a different end point
//   .route('/chores')
//   .get(controller.chores.get)



module.exports = router;

