const Good = require('good');
const Joi = require('joi');

const anecdotes = require('../data/anecdotes.json');

function getAnecdote(id) {
  return anecdotes.find(a => a.id === id);
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
        handler : (request, reply) => {
          const id = encodeURIComponent(request.params.anecdoteid);
          const anecdote = getAnecdote(id);
          if (anecdote===undefined) {
            reply("This anecdote was not found").code(404);
          } else {
            reply(anecdote);
          }
        }
    })


};
