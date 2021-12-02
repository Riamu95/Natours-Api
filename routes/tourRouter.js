const exp = require('express');
const { getAllTours, addTour, getTour,
updateTour, deleteTour, checkID, checkBody} = require('../controllers/tourController');

const router = exp.Router();


router.route('/')
  .get(getAllTours)
  .post(addTour);


router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;