import Joi from "joi";

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
        "string.pattern.base": "companyName field only contains alphabets.",
        "string.min": "companyName field must be at least 3 characters long.",
        "any.required": "companyName field is required.",
        "string.empty":
          "companyName field should not be empty. Please provide a value for the companyName field.",
      }),
    summary: Joi.string()
      .required()
      .min(3)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.min": "summary field must be at least 3 characters long.",
        "any.required": "summary field is required.",
        "string.empty":
          "summary field should not be empty. Please provide a value for the summary field.",
      }),
    serviceStart: Joi.date().required().messages({
      "date.base": "Start date field must be a valid date.",
      "any.required": "Start date field is required.",
    }),
    serviceEnd: Joi.date().required().messages({
      "date.base": "End date field must be a valid date.",
      "any.required": "End date field is required.",
    }),
  });

export {experiencevalid}