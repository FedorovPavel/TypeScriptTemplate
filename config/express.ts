import { Config } from './config';
import express from 'express';
import glob from 'glob';

import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

export = (app: express.Application, config: Config): express.Application => {
    const env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());

    //----views-----//
    // app.set('views', config.root + '/app/views');
    // app.set('view engine', 'jade');

    //-------static------//
    // app.use(express.static(config.root + '/public'));
    // app.use(methodOverride());

    app.disable('x-powered-by');


    const controllers = glob.sync(config.root + '/app/controllers/*/*.js');
    controllers.forEach((controller: string) => {
        require(controller)(app);
    });

    app.use((req, res, next) => {
        const err: any = new Error('not found');
        err.status = 404;
        next(err);
    });

    app.use((err: any, req: any, res: any, next: any) => {
        return res.status(err.status || 500).send({ message: 'server error: ' + err.message });
    });

    require('../socket/socketPort');

    return app;
}