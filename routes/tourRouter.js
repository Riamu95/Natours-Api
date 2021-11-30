const exp = require('express');
const { getAllTours, addTour, getTour,
updateTour, deleteTour, checkID} = require('../controllers/tourController');

const router = exp.Router();

router.param('id' , ( req, res, next, val) => {
  checkID(req,res,next,val);
});

router.route('/')
  .get(getAllTours)
  .post(addTour);

router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;