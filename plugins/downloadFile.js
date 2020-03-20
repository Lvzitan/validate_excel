'use strict'
exports.register = (server) => {

    //serve any file requested by name
    server.route({
        method: 'GET',
        path: '/{file*}', //*file name is passed here*
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: false,
            }
        }
    });
}

exports.pkg = {
    name: "download"
}