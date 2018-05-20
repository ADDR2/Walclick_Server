const validator = require('validator');
const { Schema: { Types: { ObjectId } } } = require('mongoose');

module.exports = () => [
    'ActiveWorks',
    {
        photographerId: {
            type: ObjectId,
            required: true,
            ref: 'Photographer'
        },
        clientId: {
            type: ObjectId,
            required: true,
            ref: 'Client'
        },
        beginDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        codeOfWork: {
            type: String,
            required: true
        },
        purpose: {
            type: String,
            required: true
        }
    }
];