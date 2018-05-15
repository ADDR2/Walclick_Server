const PORT = process.env.PORT || 5000;

const socketIO = require('socket.io');
const io = socketIO(PORT, {
    path: '/',
    serveClient: false,
    pingInterval: 10000,
    cookie: false
});

const createCustomEvents = require('./EventsLoader');
const MongooseClient = require('./MongooseClient');
const models = require('./Models');
const mongooseConnection = new MongooseClient({
    domain: '',
    models
});

mongooseConnection.thrown
.then( () => {
    io.on('connection', socket => {
        const socketID = socket.id;
        console.log(`Client ${socketID} connected - ${new Date()}`);
    
        createCustomEvents(socket, mongooseConnection);
    
        socket.on(
            'disconnect',
            () => console.log(`Client ${socketID} disconnected - ${new Date()}`)
        );
    });
})
.catch( error => console.log(error.message));