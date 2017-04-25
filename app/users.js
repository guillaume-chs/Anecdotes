
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
        config: {
            validate: {
                payload: {
                    firstName: Joi.string().required().min(1),
                    lastName: Joi.string().required().min(1),
                    email: Joi.string().required().email(),
                    birthday: Joi.number().required()
                }
            }
        },
        handler: (request, reply) => {
            // 1: client authenticated      401
            // Let's say it's okay

            // 2: request valid             400 Bad Request
            // Trust in Joi

            // 3: Already exists ?          403

            // 5: CREATED                   201 + Location
            var user = request.payload;
            user["id"] = parseInt(users[users.length - 1].id) + 1;
            users.push(user);
            reply().code(201).header('Location', '/users/' + user.id);
        }
    });

    
    server.route({
        method: 'GET',
        path: '/users/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().required().min(1)
                }
            }
        },
        handler: (request, reply) => {
            reply(users[request.params.id]);
        }
    });
};