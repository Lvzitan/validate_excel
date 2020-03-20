'use strict'
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const server = Hapi.server ({
    port: 4000,
    host: 'localhost',
    // routes: {
    //     files: {
    //         relativeTo: Path.join(__dirname, 'public')
    //     }
    // }
});

const init = async () => {
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
        plugin: require('./plugins/uploadFile')
    });

    await server.register({
        plugin: require('./plugins/validateFile')
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
   
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

