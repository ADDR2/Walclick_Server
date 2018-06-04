const createClientEvents = require('../ClientEvents');
const createPhotographerEvents = require('../PhotographerEvents');

let PermanentClient, PermanentPhotographer;

module.exports = (socket, mongooseConnection) => {
    const removeListeners = () => 
        socket.removeAllListeners('Photographer') &&
        socket.removeAllListeners('Client') &&
        socket.removeAllListeners('PermanentClient') &&
        socket.removeAllListeners('PermanentPhotographer')
    ;

    socket.on(
        'Client',
        () => removeListeners() && createClientEvents(socket, mongooseConnection, { PermanentClient, PermanentPhotographer })
    );
    
    socket.on(
        'Photographer',
        () => removeListeners() && createPhotographerEvents(socket, mongooseConnection, { PermanentClient, PermanentPhotographer })
    );

    socket.on(
        'PermanentClient',
        () => removeListeners() && (PermanentClient = socket)
    );

    socket.on(
        'PermanentPhotographer',
        () => removeListeners() && (PermanentPhotographer = socket)
    );
};