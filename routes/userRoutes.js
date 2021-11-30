const exp = require('express');
const { getAllUsers, createUser,
getUser, updateUser } = require('../controllers/userController');

const router = exp.Router();

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(updateUser);

module.exports = router;