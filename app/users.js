
const Good = require('good');
const Joi = require('joi');

const users = require('../data/users.json');


module.exports = function(server) {
    
    server.route({
        method: 'GET',
        path: '/users',
        handler: (request, reply) => {
            reply(users);
        }
    });



    server.route({
        method: 'POST',
        path: '/users',
        // TODO : check if we can validate request body
        // config: {
        //     validate: {
        //         params: {
        //             id: Joi.number().min(0),
        //             option: Joi.string().required().valid('on', 'off')
        //         }
        //     }
        // },
        handler: (request, reply) => {
            // 1: client authenticated      401
            // 2: request valid             400 Bad Request

            // 3: Already exists ?          403
            // 4: Users exist ?             404

            // 5: CREATED                   201 + Location



            // if (!ready) {
            //     reply('Not initialized').code(405); // Not Allowed

            // } else if (!arduino.ledExists(request.params.id)) {
            //     reply('Not found').code(404); // Not Found

            // } else {
            //     if ((on && status) || (off && !status)) {
            //         reply('Already ' + request.params.option).code(304); // Not Modified
            //     } else {
            //         reply().code(204); // No Content
            //     }
            // }
        }
    });

};