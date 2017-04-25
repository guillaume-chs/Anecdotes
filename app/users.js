

module.exports = function(server) {
    
    server.route({
        method: 'GET',
        path: '/users',
        handler: (request, reply) => {
            reply({
                data: "ok"
            });
        }
    });



};