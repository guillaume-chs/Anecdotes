'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Joi = require('joi');


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 4304
});



/****************************/
/******* EXEMPLE ************/
/****************************/
// server.route({
//     method: 'POST',
//     path: '/init',
//     handler: (request, reply) => {
//         ready = true;
//         reply('Initialized').code(201);
//     }
// });

// server.route({
//     method: 'POST',
//     path: '/led/{id}/actions/switch/{option}',
//     config: {
//         validate: {
//             params: {
//                 id: Joi.number().min(0),
//                 option: Joi.string().required().valid('on', 'off')
//             }
//         }
//     },
//     handler: (request, reply) => {
//         if (!ready) {
//             reply('Not initialized').code(405); // Not Allowed

//         } else if (!arduino.ledExists(request.params.id)) {
//             reply('Not found').code(404); // Not Found

//         } else {
//             if ((on && status) || (off && !status)) {
//                 reply('Already ' + request.params.option).code(304); // Not Modified
//             } else {
//                 reply().code(204); // No Content
//             }
//         }
//     }
// });

require('./app/users.js')(server);
require('./app/anecdotes.js')(server);








// Start the server
server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {
    if (err) throw err;
    server.start((err) => {
        if (err) throw err;
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});