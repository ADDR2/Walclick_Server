const createClientEvents = require('../ClientEvents');
const createPhotograferEvents = require('../PhotograferEvents');

module.exports = (socket, mongooseConnection) => {
    const removeListeners = () => socket.removeAllListeners('Photografer') && socket.removeAllListeners('Client');

    socket.on(
        'Client',
        () => removeListeners() && createClientEvents(socket, mongooseConnection)
    );
    
    socket.on(
        'Photografer',
        () => removeListeners() && createPhotograferEvents(socket, mongooseConnection)
    );
};