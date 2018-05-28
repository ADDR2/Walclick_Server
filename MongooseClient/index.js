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

    createPhotographer(photographerData){
        const newPhotographer = new this.models.Photographer(photographerData);
        return newPhotographer.save();
    }

    clientLooking({ username, lat, long, alt, socketId }){
        return new Promise((resolve, reject) => {
            const activeDate = Date.now();
            this.models.Client.findOneAndUpdate(
                { username },
                { $set: { lat, long, alt, activeDate:activeDate, deactivationDate:null} },{new: true},
                (err, doc) => {
                    if (err) reject(err);
                    else if(!doc) reject(new Error('User not found'));
                    else resolve(doc);
                }
            );
        });
    }

    coords({ username, lat, long, alt }){
        return new Promise((resolve, reject) => {
            this.models.Client.findOneAndUpdate(
                { username },
                { $set: { lat, long, alt } }, {new: true},
                (err, doc) => {
                    if (err) reject(err);
                    else resolve(doc);
                }
            );
        });
    }
}

module.exports =  MongooseClient;