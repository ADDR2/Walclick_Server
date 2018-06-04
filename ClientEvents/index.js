module.exports = (socket, mongooseConnection, { PermanentPhotographer }) => {
    const possibleActions = [
        'createClient',
        'clientLooking',
        'coords'
    ];

    possibleActions.forEach( action => {
        socket.on(action, (data, ack) => {
            mongooseConnection[action](data)
            .then( ack )
            .catch( error => ack(undefined, error.message) );
        });
    });
};