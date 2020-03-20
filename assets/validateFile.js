'use strict'
const excelMath = require('../excelMath');

exports.register = (server) => {

    server.route({
        method: 'GET',
        path: '/validate',
        options: {
            tags: ['api']
        },
        handler: async (request, reply) => {

            var file = './public/Math.xlsx';
            excelMath.checkMath(file);

            //NEEDS WORKARROUND, SERVER.INFO.URI AND FILENAME MUST BE PASSED 
            toDownload = 'http://localhost:4000/Math.xlsx';
            return reply.redirect(toDownload);
        }
    });
}

exports.pkg = {
    name: "validate"
}