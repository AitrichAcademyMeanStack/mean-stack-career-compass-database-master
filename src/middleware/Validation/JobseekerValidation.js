import Joi from "joi";

const jobseekervalidation = Joi.object({
    firstName: Joi.string()
      .required()
      .min(3)
      .max(30)
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        "string.pattern.base": "firstName field only contains alphabets without spaces",
        "string.min": "firstName field must be at least 3 characters long",
        "any.required": "firstName field is required",
        "string.empty": "firstName field should not be empty. Please provide a value for the firstName field.",
      }),
    lastName: Joi.string()
      .required()
      .min(1)
      .max(30)
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        "string.pattern.base": "lastName field only contains alphabets without spaces",
        "string.min": "lastName field must be at least 1 character long",
        "any.required": "lastName field is required",
        "string.empty": "lastName field should not be empty. Please provide a value for the lastName field.",
      }),
    userName: Joi.string()
      .required()
      .min(3)
      .max(30)
      .pattern(/^[a-zA-Z0-9]+$/)
      .messages({
        "string.pattern.base": "userName field only contains alphabets and numbers without spaces",
        "string.min": "userName field must be at least 3 characters long",
        "any.required": "userName field is required",
        "string.empty": "userName field should not be empty. Please provide a value for the userName field.",
      }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({
        "string.base": "Email must be a string",
        "string.email": "Please enter a valid email address",
        "string.empty": "Email field should not be empty. Please provide a value for the email field",
        "any.required": "Email is required",
        "string.minDomainSegments": "Email must have at least two domain segments",
        "string.tlds.allow": 'Only ".com" and ".net" domains are allowed',
      }),
      phone: Joi.number()
      .required()
      .integer()
      .greater(999999999)
      .less(999999999999999)
      .positive()
      .messages({
        "number.greater": "Phone Number must be length of at least 10.",
        "number.less": "Phone Number must be length of at most 15.",
        "any.required": "Phone Number is required.",
        "number.positive": "Phone must be a positive number.",
        "number.empty": "Phone Number should not be empty. Please provide a value for the Phone field.",
      }),
      password: Joi.string()
      .required()
      .min(8)
      .max(15)
      .pattern(/^[a-zA-Z0-9@]+$/)
      .messages({
        "string.pattern.base": "password field only contains alphabets without spaces",
        "string.min": "password should be minimum 8 characters long",
        "string.max": "password should be maximum 15 characters long",
        "any.required": "password field is required",
        "string.empty": "password field should not be empty. Please provide a value for the password field.",
      })
    
  })

export {jobseekervalidation}