//importing joi
import Joi from "joi";  

// Validation of JobProvider
const jobProviderValidate = Joi.object({
    legalName: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.pattern.base": "LegalName field only contains alphabets.",
        "string.min": "LegalName field must be at least 3 characters long.",
        "any.required": "LegalName field is required.",
        "string.empty":
          "LegalName field should not be empty. Please provide a value for the jobTitle field.",
      }),
    summary: Joi.string()
      .required()
      .min(3)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.pattern.base": "summary field only contains alphabets.",
        "string.min": "summary field must be at least 3 characters long.",
        "any.required": "summary field is required.",
        "string.empty":
          "summary field should not be empty. Please provide a value for the companyName field.",
      }),
    industry: Joi.array().required()
    .messages({
      "any.required": "Industry field is required.",
      "string.empty":
        "Industry field should not be empty. Please provide a value for the Industry field.",
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
    }),
    address: Joi.string()
      .required()
      .min(3)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.min": "address field must be at least 3 characters long.",
        "any.required": "address field is required.",
        "string.empty":
          "address field should not be empty. Please provide a value for the address.",
      }),
    website: Joi.string()
      .required()
      .min(3)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.min": "website field must be at least 3 characters long.",
        "any.required": "website is required.",
        "string.empty":
          "website field should not be empty. Please provide a value for the website.",
      }),
    location: Joi.string().required().messages({
      "any.required": "location field is required.",
      "string.empty":
        "location should not be empty. Please provide a value for the location field.",
    }),
  });

 export {jobProviderValidate}