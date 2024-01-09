import Joi from "joi";

const jobPostvalidation=Joi.object({
    jobTitle:Joi.string()
    .required()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z0-9]/)
    .messages({
      "string.pattern.base": "jobTitle field only contains alphabets and numbers",
      "string.min": "jobTitle field must be at least 3 characters long",
      "any.required": "jobTitle field is required",
      "string.empty": "jobTitle field should not be empty. Please provide a value for the jobTitle field.",
    }),
   
    jobSummary:Joi.string()
    .required()
    .min(10)
    .max(100)
    .pattern(/^[a-zA-Z0-9]/)
    .messages({
      "string.pattern.base": "jobSummary field only contains alphabets and numbers",
      "string.min": "jobSummary field must be at least 10 characters long",
      "any.required": "jobSummary field is required",
      "string.empty": "jobSummary field should not be empty. Please provide a value for the jobSummary field.",
    }),
    jobLocation:Joi.array().items(Joi.string()).required(),
    category:Joi.array().items(Joi.string()).required(),
    qualifications:Joi.array().items(Joi.string()).required(),
    skills:Joi.array().items(Joi.string()).required(),
    industry:Joi.array().items(Joi.string()).required(),
    jobResponsibilities:Joi.string()
    .required()
    .min(10)
    .max(100)
    .pattern(/^[a-zA-Z0-9]/)
    .messages({
      "string.pattern.base": "jobResponsibilities field only contains alphabets and numbers",
      "string.min": "jobResponsibilities field must be at least 10 characters long",
      "any.required": "jobResponsibilities field is required",
      "string.empty": "jobResponsibilities field should not be empty. Please provide a value for the jobResponsibilities field.",
    }),
   })

export {jobPostvalidation}