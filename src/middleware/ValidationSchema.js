import Joi from "joi"; //importing joi

// Validating schema
const authschema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "Name field only contains alphabets",
      "string.min": "Name field must be at least 3 characters long",
      "any.required": "Name field is required",
      "string.empty":
        "Name field should not be empty. Please provide a value for the name field.",
    }),
  description: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "Description field only contains alphabets",
      "string.min": "Description field must be at least 3 characters long",
      "any.required": "Description field is required",
      "string.empty":
        "description field should not be empty. Please provide a value for the description field.",
    }),
});

//validating work experience schema
const experiencevalid = Joi.object({
  jobTitle: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "jobTitle field only contains alphabets",
      "string.min": "jobTitle field must be at least 3 characters long",
      "any.required": "jobTitle field is required",
      "string.empty":
        "jobTitle field should not be empty. Please provide a value for the jobTitle field.",
    }),
  companyName: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "companyName field only contains alphabets",
      "string.min": "companyName field must be at least 3 characters long",
      "any.required": "companyName field is required",
      "string.empty":
        "companyName field should not be empty. Please provide a value for the companyName field.",
    }),
  summary: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.min": "summary field must be at least 3 characters long",
      "any.required": "summary field is required",
      "string.empty":
        "summary field should not be empty. Please provide a value for the summary field.",
    }),
  serviceStart: Joi.date().required().messages({
    "date.base": "Start date field must be a valid date",
    "any.required": "Start date field is required",
  }),
  serviceEnd: Joi.date().required().messages({
    "date.base": "End date field must be a valid date",
    "any.required": "End date field is required",
  }),
});

const jobProviderValidate = Joi.object({
  legalName: Joi.string()
    .alphanum()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "LegalName field only contains alphabets",
      "string.min": "LegalName field must be at least 3 characters long",
      "any.required": "LegalName field is required",
      "string.empty":
        "LegalName field should not be empty. Please provide a value for the jobTitle field.",
    }),
  summary: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.pattern.base": "summary field only contains alphabets",
      "string.min": "summary field must be at least 3 characters long",
      "any.required": "summary field is required",
      "string.empty":
        "summary field should not be empty. Please provide a value for the companyName field.",
    }),
  industry: Joi.array().required()
  .messages({
    "any.required": "Industry field is required",
    "string.empty":
      "Industry field should not be empty. Please provide a value for the Industry field.",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
      "string.minDomainSegments":
        "Email must have at least two domain segments",
      "string.tlds.allow": 'Only ".com" and ".net" domains are allowed',
    }),
  phone: Joi.number().required().integer().min(10).positive().messages({
    "number.min": "Phone Number must be length of 10",
    "any.required": "Phone Number is required",
    "any.required": "Phone must be positive",
    "number.empty":
      "Phone Number should not be empty. Please provide a value for the Phone field.",
  }),
  address: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.min": "address field must be at least 3 characters long",
      "any.required": "address field is required",
      "string.empty":
        "address field should not be empty. Please provide a value for the address field.",
    }),
  website: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.min": "website field must be at least 3 characters long",
      "any.required": "website field is required",
      "string.empty":
        "website field should not be empty. Please provide a value for the website field.",
    }),
  location: Joi.array().required().messages({
    "any.required": "location field is required",
    "string.empty":
      "location field should not be empty. Please provide a value for the location field.",
  }),
});

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
    .min(10)
    .max(15)
    .positive()
    .messages({
      "number.min": "Phone Number must be a length of at least 10",
      "number.max": "Phone Number must be a length of at most 15",
      "any.required": "Phone Number is required",
      "number.positive": "Phone must be a positive number",
      "number.empty": "Phone Number should not be empty. Please provide a value for the Phone field.",
    }),
});


export { authschema, experiencevalid, jobProviderValidate ,jobseekervalidation};
