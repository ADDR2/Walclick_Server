const validator = require('validator');

module.exports = () => [
    'Photographer',
    {
        username: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: "{VALUE} is not a valid email"
            }
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true,
            minlength: 2
        },
        lastName: String,
        age: {
            type: Number,
            required: true,
            min: 18,
            max: 150
        },
        homePhone: {
            type: String,
            default: '12345'
        },
        cellPhone: {
            type: String,
            default: '12345'
        },
        profile: Object,
        activeDate: Date,
        deactivationDate: Date,
        working: Boolean,
        lat: Number,
        long: Number,
        alt: Number
    }
];