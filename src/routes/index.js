const express = require('express');

const {
    listContractos,
} = require('../controllers/users/email.controller');
const routerApi = app => {
    const router = express();

    app.use('', router);
    router.use('/', listContractos);
};

module.exports = routerApi;