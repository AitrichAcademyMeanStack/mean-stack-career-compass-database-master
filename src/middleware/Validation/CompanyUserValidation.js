//importing joi
import Joi from "joi";  

// Validatng CompanyUser
const companyUserValidate = Joi.object({
    firstName: Joi.string().required().min(5).alphanum().pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "firstName field only contains alphabets.",
        "string.min": "firstName must be at least 8 characters long.",
        "any.required": "firstName is required.",
        "string.empty":
        "firstName should not be empty. Please provide a value for the firstName.",
    }),
    role: Joi.string().required().pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "role only contains alphabets.",
      "any.required": "role is required.",
      "string.empty":
      "role should not be empty. Please provide a value for the role.",
    }),
    lastName:Joi.string().min(5).required().pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "lastName only contains alphabets.",
      "any.required": "lastName is required.",
      "string.empty":
      "lastName should not be empty. Please provide a value for the lastName.",
    }),
    userName:Joi.string().min(5).required().pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "userName only contains alphabets.",
      "any.required": "userName is required.",
      "string.empty":
      "userName should not be empty. Please provide a value for the userName.",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({
        "string.base": "Email must be a string.",
        "string.email": "Please enter a valid email address.",
        "string.empty": "Email is required.",
        "any.required": "Email is required.",
        "string.minDomainSegments":
          "Email must have at least two domain segments.",
        "string.tlds.allow": 'Only ".com" and ".net" domains are allowed.',
      }),
    phone: Joi.number().required().integer().min(10).positive().messages({
      "number.min": "Phone Number must be length of 10.",
      "any.required": "Phone Number is required.",
      "any.required": "Phone must be positive.",
      "number.empty":
        "Phone Number should not be empty. Please provide a value for the Phone field.",
    })
  
  })

export  {companyUserValidate}
  