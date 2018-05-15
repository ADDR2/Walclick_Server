const mongoose = require('mongoose');

class MongooseClient {
    constructor({ domain, models }) {
        this.thrown = new Promise((resolve, reject) => {
            mongoose.connection.on('error', error => console.log(`Error on DB ${domain}: ${error}`));
            mongoose.connection.once('open', () => console.log(`Connected to DB: ${domain}`));

            mongoose.connect(domain)
            .then(() => {
                this.models = {};

                Object.values(models).forEach( modelGenerator => {
                    const [ name, schema ] = modelGenerator();
                    this.models[name] = mongoose.model(name, new mongoose.Schema(schema));
                });
                resolve();
            })
            .catch(reject);
        });
    }

    createClient(clientData){
        const newClient = new this.models.Client(clientData);
        return newClient.save();
    }

    showClient(id){

    }
}

module.exports =  MongooseClient;