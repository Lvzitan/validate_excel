'use strict'
const Path = require('path');
const Joi = require('@hapi/joi');

const fs = require('fs');
const {
    promisify
} = require('util');
const writeFile = promisify(fs.writeFile);

const excelMath = require('../excelMath');
const Server = require('../server');

const uploadPlugin = {
    name:'upload-xlsx',
    version: '1.0.0',
    register: async function (server, options){

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
               
                try{
                    //Path for desired folder
                    const uploads = './uploads/';
                    //Create dir if not exists
                    if (!fs.existsSync(uploads)) {
                        await mkdir(uploads);
                    }
        
                    let filename = request.payload.file.hapi.filename;
                    filename = filename.slice(0, -5);
                    const filePath = Path.join(uploads, filename + '.xlsx');

                    //Save file on dir
                    await writeFile(filePath, request.payload.file._data)

                    console.log("\nFinished uploading %s, validating...", filename);
                    
                    //validation
                    excelMath.checkMath(filePath);
                    console.log("Validated %s successfully", filename)
                    
                    //set string for redirect
                    const getFile = `${server.info.uri}/`+filename+".xlsx";
                    //return file
                    return reply.redirect(getFile);
                }
                catch(err){
                    console.error();

                    return err;
                    
                }
            }
        });
    }
}

module.exports = uploadPlugin;
