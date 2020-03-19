'use strict'
const excelMath = require('../excelMath');

exports.register = (server) => {

    server.route({
        method: 'GET',
        path: '/validate',
        options: {
            tags: ['api']
        },
        handler: async (request, h) => {

            var file = './public/Math.xlsx';
            excelMath.checkMath(file);

            //console.log(h);
            return 'File validated';
        }
    });
}

exports.pkg = {
    name: "validate"
}