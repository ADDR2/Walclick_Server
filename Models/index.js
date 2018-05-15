const fs = require('fs');

const folder = `${__dirname}/../Models/`;
const models = {};

fs.readdir(folder, (err, files) => {
    if(err) throw new Error(err);

    for(file of files) {
        models[file.replace('.js', '')] = require(`./${file}`);
    }
    delete models.index;
});

module.exports = models;