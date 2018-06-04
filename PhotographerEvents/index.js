module.exports = (socket, mongooseConnection, { PermanentClient }) => {
    const possibleActions = [
        'createPhotographer',
        'photographerLooking'
    ];

    possibleActions.forEach( action => {
        socket.on(action, (data, ack) => {
            mongooseConnection[action](data)
            .then( ack )
            .catch( error => ack(undefined, error.message) );
        });
    });

    socket.on('photographerFound', (data, ack) => {
        PermanentClient.emit('photographerFound', { clientSocketId, photographerInfo }, (result, error) => {
            if(error) ack(undefined, error);
            else ack(result);
        });
    });
};