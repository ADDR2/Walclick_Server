module.exports = (socket, mongooseConnection, { PermanentPhotographer }) => {
    const possibleActions = [
        'createClient',
        'coords'
    ];

    possibleActions.forEach( action => {
        socket.on(action, (data, ack) => {
            mongooseConnection[action](data, 'Client')
            .then( ack )
            .catch( error => ack(undefined, error.message) );
        });
    });

    socket.on('clientLooking', async (data, ack) => {
        try {
            const { username: clientUsername } = await mongooseConnection.clientLooking(data);
            const photographersActive = await mongooseConnection.findPhotographersActive();

            PermanentPhotographer.emit(
                'clientLooking',
                { clientUsername, photographersActive },
                (result, error) => {
                    if(error) ack(undefined, error);
                    else ack(result);
                }
            );
        } catch(error) {
            ack(undefined, error.message);
            console.log(error);
        }
    });
};