module.exports = (socket, mongooseConnection) => {
    const possibleActions = [
        'createPhotographer'
    ];

    possibleActions.forEach( action => {
        socket.on(action, (data, ack) => {
            mongooseConnection[action](data)
            .then( ack )
            .catch( error => ack(undefined, error.message) );
        });
    });
};