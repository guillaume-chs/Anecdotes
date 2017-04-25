const Good = require('good');
const Joi = require('joi');

const anecdotes = require('../data/anecdotes.json');

module.exports = function(server) {

    server.route({
        method: 'GET',
        path: '/anecdotes',
        handler: (request, reply) => {
            reply(anecdotes);
        }
    });



};
