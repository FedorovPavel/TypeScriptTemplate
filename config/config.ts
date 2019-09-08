const env = process.env.NODE_ENV || 'development';
import path = require('path');
const root = path.normalize(__dirname + './../');

export interface Config {
    readonly root: string;
    app: {
        readonly name: string;
    };
    readonly port: number | string;
    readonly db: string;
}

interface ConfigList {
    [key: string]: Config;
};

const config: ConfigList = {
    'test': {
        root,
        app: {
            name: 'test'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/template-test'
    }, 
    'development': {
        root,
        app: {
            name: 'dev'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/template-dev'
    }
};

export const curConfig = config[env];