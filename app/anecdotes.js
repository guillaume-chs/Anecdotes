

module.exports = function(server) {
    
    server.route({
        method: 'GET',
        path: '/anecdotes',
        handler: (request, reply) => {
            reply('OK');
        }
    });



};