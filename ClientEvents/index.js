module.exports = (socket, mongooseConnection) => {
    const possibleActions = [
        'createClient',
        'showClient'
    ];

    possibleActions.forEach( action => {
        socket.on(action, data => {
            mongooseConnection[action](data)
            .then( result => socket.emit('response', result))
            .catch( error => socket.emit('actionError', error.message));
        });
    });
};