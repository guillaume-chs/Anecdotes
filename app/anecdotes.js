const Good = require('good');
const Joi = require('joi');

const anecdotes = require('../data/anecdotes.json');
const users = require('../data/users.json');

function getAnecdote(id) {
    return anecdotes.find(a => a.id == id);
}

function getUser(id) {
    return users.find(u => u.id == id);
}

function checkAllActors(actors) {
    return !users.find(id => !!users[id]);
}

module.exports = function(server) {

    server.route({
        method: 'GET',
        path: '/anecdotes',
        handler: (request, reply) => {
            reply(anecdotes);
        }
    });

    server.route({
        method: 'GET',
        path: '/anecdotes/{anecdoteid}',
        handler: (request, reply) => {
            const id = encodeURIComponent(request.params.anecdoteid);
            const anecdote = getAnecdote(id);
            if (!anecdote) {
                reply("This anecdote was not found").code(404);
            } else {
                reply(anecdote);
            }
        }
    })

    server.route({
        method: 'POST',
        path: '/anecdotes',
        config: {
            validate: {
                payload: {
                    title: Joi.string().required().min(1),
                    message: Joi.string().required().min(1),
                    author: Joi.number().required(),
                    tags: Joi.array().items(Joi.string()),
                    happenedOn: Joi.number().required(),
                    actors: Joi.array().items(Joi.number())
                }
            }
        },
        handler: (request, reply) => {
            const anecdote = request.payload;
            const author = getUser(parseInt(anecdote.author));
            if (!author) {
                reply("The author don't exists").code(404);
            } else if (!checkAllActors(anecdote.actors)) {
                reply("At least one of actors don't exists").code(404);
            } else {
                anecdote.id = anecdotes.length + 1;
                anecdotes.push(anecdote);
                reply().code(201).header('Location', `/anecdotes/${anecdote.id}`);
            }
        }
    })


};
