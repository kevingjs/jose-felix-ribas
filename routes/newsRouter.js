const router = require('express').Router();
const newsCtrl = require('../controllers/newsCtrl');

router.get('/news', newsCtrl.getNews)

module.exports = router;