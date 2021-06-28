const { Router } = require('express');
const router = Router();
const auth = require("../../middleware/auth")

const { getScore, registerScore, cu_testValue_answersTable } = require('../controllers/ranking.controller');

router.route('/:id')
    .get(auth, getScore);

router.route('/')
    .post(auth, registerScore);

router.route("/:cu")
    .post(auth, cu_testValue_answersTable)

module.exports = router;

