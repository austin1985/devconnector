const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    // Name checks
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters and maximum of 30'
    }

    // Password2 checks
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required'
    }

    if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
        errors.password2 = 'Confirm password must be at least 6 characters and maximum of 30'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}