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

    createClient(clientData) {
        const newClient = new this.models.Client(clientData);
        return newClient.save();
    }

    createPhotographer(photographerData) {
        const newPhotographer = new this.models.Photographer(photographerData);
        return newPhotographer.save();
    }

    clientLooking({ username, lat, long, alt, socketId }) {
        return new Promise((resolve, reject) => {
            const activeDate = Date.now();
            this.models.Client.findOneAndUpdate(
                { username },
                { $set: { lat, long, alt, activeDate, deactivationDate: null, socketId } },
                { new: true },
                (err, doc) => {
                    if (err) reject(err);
                    else if(!doc) reject(new Error('User not found'));
                    else resolve(doc);
                }
            );
        });
    }

    photographerLooking({ username, lat, long, alt, socketId }) {
        return new Promise((resolve, reject) => {
            const activeDate = Date.now();
            this.models.Photographer.findOneAndUpdate(
                { username },
                { $set: { lat, long, alt, activeDate, deactivationDate: null, socketId } },
                { new: true },
                (err, doc) => {
                    if (err) reject(err);
                    else if(!doc) reject(new Error('Photographer not found'));
                    else resolve(doc);
                }
            );
        });
    }

    findPhotographersActive() {
        return new Promise((resolve, reject) => {
            this.models.Photographer.find(
                { activeDate: { $ne: null } },
                (err, doc) => {
                    if (err) reject(err);
                    else if(!doc) reject(new Error('No photographers found'));
                    else resolve(doc);
                }
            )
            .select('username firstName age cellPhone profile lat long alt socketId');
        });
    }

    coords({ username, lat, long, alt }) {
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