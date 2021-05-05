const { Router } = require('express');
const router = Router();

const { getTests, getTest, updateTest } = require('../controllers/tests.controller');

router.route('/')
    .get(getTests)
    

router.route('/:id')
    .get(getTest)

router.route('/:id')
    .put(updateTest)


   

module.exports = router;