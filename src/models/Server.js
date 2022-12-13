const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');

// const { usuarioRoutes } = require('../routes/userRoutes');
const routerApi = require('../routes/index');
const {
    listContractos,
} = require('../controllers/users/email.controller');

class Server {
    constructor() {
        this.app = express();
        this.routes();
        this.cron();
    }
    middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    routes() {
        routerApi(this.app);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(
                `Servidor corriendo en el puerto http://localhost:${process.env.PORT}`
            );
        });
    }

    cron() {
        cron.schedule(" 50 30 11 * * *", () => {
            console.log("Cada 3 segundos")
            listContractos();
        }, {
            timezone: "America/Lima"

        });
    }
}
module.exports = Server;