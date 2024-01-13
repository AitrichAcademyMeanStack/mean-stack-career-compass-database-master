//importing joi
import Joi from "joi";  

// Validatng CompanyUser
const companyUserValidate = Joi.object({
    firstName: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "firstName field only contains alphabets.",
        "string.min": "firstName must be at least 3 characters long.",
        "any.required": "firstName is required.",
        "string.empty":
        "firstName should not be empty. Please provide a value for the firstName.",
    }),
    role: Joi.string().required()
    .messages({
      "any.required": "role is required.",
      "string.empty":
      "role should not be empty. Please provide a value for the role."
    }),
    lastName:Joi.string().min(1).required().pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "lastName only contains alphabets.",
      "string.min": "lastName must be at least 1 characters long.",
      "any.required": "lastName is required.",
      "string.empty":
      "lastName should not be empty. Please provide a value for the lastName.",
    }),
    userName:Joi.string().min(5).required().pattern(/^[a-zA-Z0-9@.\s]+$/)
    .messages({
      "string.pattern.base": "userName only contains alphabets.",
      "string.min": "userName must be at least 5 characters long.",
      "any.required": "userName is required.",
      "string.empty":
      "userName should not be empty. Please provide a value for the userName.",
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
      })
  
  })

export  {companyUserValidate}
  