const express = require('express');
const router = express.Router();
// const {
//   getAllUsers,
//   getUser,
//   createUser,
//   deleteUser,
//   loginUser
// } = require('../controllers/userController');
// const checkAuth = require('../middlewares/checkAuth');

// router.route('/login').post(loginUser);

// router
//   .route('/')
//   .get(checkAuth, getAllUsers)
//   .post(createUser);

// router
//   .route('/:id')
//   .get(checkAuth, getUser)
//   .delete(checkAuth, deleteUser);

const { userRegister, userLogin } = require('../controllers/userController');
 
router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;