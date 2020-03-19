'use strict'
const Path = require('path');
const Fs = require('fs');

exports.register = (server) => {

    //***this route will later be a plugin to receive uploaded files***
    //This route accepts a submitted multipart form and saves the uploaded files to the filesystem using the built-in Node fs module
    server.route({
        config: {
            tags: ['api'],
            //attempt to parse payload into an object
            payload: {
                parse: true,
                output: 'file',
                maxBytes: 10000000
            }
        },
        method: 'POST',
        path: '/upload', 
        handler: function(request, reply) {
            //the uploaded file's name
            const uploadName = Path.basename(request.payload.upload.filename);
            //path to saved temporary file
            const uploadPath = request.payload.upload.path;
            //destination path on local filesystem to move uploaded file to
            const destination = Path.join(__dirname, 'uploads', uploadName);

            //Move(rename) file from temp location into uploads directory
            Fs.rename(uploadPath, destination, (err) => {
                if(err){throw err;}

                reply('ok');
            }); 
        }       
    });
}

exports.pkg = {
    name: "upload"
}