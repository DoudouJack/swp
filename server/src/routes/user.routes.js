const exrepss = require('express');
const router = exrepss.Router();
const userController = require('../controllers/user.controller');

router.get('/test', userController.test);

module.exports = router;
router.post('/create', userController.userCreate);
router.get('/:id', userController.userDetails);

