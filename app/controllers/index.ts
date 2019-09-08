import express = require('express');
const router = express.Router();

module.exports = (app: express.Application) => {
    app.use('/', router);
};

router.get('/', async (req, res, next) => {

    return res.status(200).send('OK: /');
});

router.get('/app', async (req, res, next) => {
    return res.status(200).send('OK: /app');
});