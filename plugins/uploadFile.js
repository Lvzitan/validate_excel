'use strict'
const Path = require('path');
const Joi = require('@hapi/joi');

const fs = require('fs');
const {
    promisify
} = require('util');
const writeFile = promisify(fs.writeFile);

exports.register = (server) => {

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
                maxBytes: 10000000,
                output: 'stream',
                allow: 'multipart/form-data'
            }
        },
        handler: async (request, reply) => {
            //Path for desired folder

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
}

exports.pkg = {
    name: "upload"
}