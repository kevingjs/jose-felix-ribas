const router = require('express').Router();
const picsCtrl = require('../controllers/picsCtrl');

router.get('/pics', picsCtrl.getPics);

module.exports = router;