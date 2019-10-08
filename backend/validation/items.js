const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateItem(formData) {
    let errors = {};

    if(Validator.isEmpty(formData.name)) {
        errors.name = "Name cannot be black!";
    }

    return {errors, isValid: isEmpty(errors)};
}