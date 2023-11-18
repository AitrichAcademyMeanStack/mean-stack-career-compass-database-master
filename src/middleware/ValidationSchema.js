import Joi from 'joi'; //importing joi

// Validating schema
const authschema = Joi.object({
    name: Joi.string().required().min(3).pattern(/^[a-zA-Z]+$/)
        .messages({
            'string.pattern.base': 'Name field only contains alphabets',
            'string.min': 'Name field must be at least 3 characters long',
            'any.required': 'Name field is required',
            'string.empty': 'Name field should not be empty. Please provide a value for the name field.',
        }),
    description: Joi.string().required().min(3).pattern(/^[a-zA-Z]+$/)
        .messages({
            'string.pattern.base': 'Description field only contains alphabets',
            'string.min': 'Description field must be at least 3 characters long',
            'any.required': 'Description field is required',
            'string.empty': 'description field should not be empty. Please provide a value for the description field.',
        }),
});

export default authschema;
