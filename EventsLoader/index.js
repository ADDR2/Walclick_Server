const createClientEvents = require('../ClientEvents');
const createPhotographerEvents = require('../PhotographerEvents');

module.exports = (socket, mongooseConnection) => {
    const removeListeners = () => socket.removeAllListeners('Photographer') && socket.removeAllListeners('Client');

    socket.on(
        'Client',
        () => removeListeners() && createClientEvents(socket, mongooseConnection)
    );
    
    socket.on(
        'Photographer',
        () => removeListeners() && createPhotographerEvents(socket, mongooseConnection)
    );
};