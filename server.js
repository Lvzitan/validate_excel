'use strict'
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Path = require('path');
const Joi = require('@hapi/joi');
//const fs = require('fs');

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

    // await server.register({
    //     plugin: require('./plugins/uploadFile')
    // });

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

    server.route({
        method: 'POST',
        path: '/setFile',
        options: {
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    file: Joi.any()
                    .meta({ swaggerType: 'file' })
                    .description('xlsx file')
                })
            },
            payload: {
                maxBytes: 10000000
            }
        },
        handler: async (request, reply) => {
            // //Path for desired folder
            // const uploads = './uploads/';
            // //Create dir if not exists
            // if (!fs.existsSync(uploads)) {
            //     await mkdir(uploads);
            // }

            // const filepath = path.join(uploads, 'teste.xlsx');
            const filepath = Path.join("./", 'teste.xlsx');
            
            //Save file on dir
            await writeFile(filepath, request.payload.file);

            //Reply ok
            console.log("\nFinished");

            return "ok";
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

