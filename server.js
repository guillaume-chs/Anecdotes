'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Joi = require('joi');

// const Bcrypt = require('bcrypt');
// const Basic = require('hapi-auth-basic');



// const validate = function (request, username, password, callback) {
//     const user = users[username];
//     if (!user) {
//         return callback(null, false);
//     }

//     Bcrypt.compare(password, user.password, (err, isValid) => {
//         callback(err, isValid, { id: user.id, name: user.name });
//     });
// };




// Create a server with a host and port
const server = new Hapi.Server();   
server.connection({
    host: 'localhost',
    port: 4304
});

server.register([/*Basic,*/ {
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
}], (err) => {
    if (err)throw err;

    // server.auth.strategy('simple', 'basic', { validateFunc: validate });

    require('./app/users.js')(server);
    require('./app/anecdotes.js')(server);

    server.start((err) => {
        if (err) throw err;
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});