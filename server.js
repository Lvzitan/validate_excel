'use strict'
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Path = require('path');

const server = Hapi.server ({
    port: 4000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'uploads')
        }
    }
});

const pluginRegister = async () => {
    //add swagger plugin for api documentation
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: Pack.version,
            },
        };     

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.register({
        plugin: require('./plugins/setFile')
    });

    await server.register({
        plugin: require('./plugins/downloadFile')
    });

    //Add route to server
    server.route({
        method: 'GET',
        path: '/',
        options: {
            tags: ['api'] // ADD THIS TAG
        },
        handler: async (request, h) => {
            
            return 'Something';
        }
    });
};

exports.init = async () => {   
    await pluginRegister();
    await server.initialize();
    return server;
};

exports.start = async () => {
    await pluginRegister();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

exports.server = server;

