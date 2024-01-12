import Joi from "joi";

const jobApplicationvalidation=Joi.object({
  
    coverletter:Joi.string()
    .required()
    .min(20)
    .max(100)
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.pattern.base": "coverletter field only contains alphabets and numbers without spaces",
      "string.min": "coverletter field must be at least 3 characters long",
      "any.required": "coverletter field is required",
      "string.empty": "coverletter field should not be empty. Please provide a value for the coverletter field.",
    }),
    status:Joi.string().required()
   })

export {jobApplicationvalidation}