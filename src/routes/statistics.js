const { Router } = require('express');
const router = Router();

const { getStats } = require('../controllers/stats.controller');

router.route('/:id')
    .get(getStats);

module.exports = router;

