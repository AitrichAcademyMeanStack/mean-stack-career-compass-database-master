import Joi from "joi";

const skillvalidate = Joi.object({
    skills: Joi
      .array()
      .items(Joi.string())
      .required()
      .messages({ 'any.required': 'Skills are required. Please provide at least one skill.' })
})
  
const qualificationvalidate = Joi.object({
    qualifications: Joi
    .array()
    .items(Joi.object({
      name: Joi.string().required().messages({
        'any.required': 'Name is required. Please provide a name.',
        'string.empty': 'Name cannot be empty.',
      }),
      institution: Joi.string().required().messages({
        'any.required': 'Institution is required. Please provide an institution.',
        'string.empty': 'Institution cannot be empty.',
      }),
      startdate: Joi.date().iso().required().messages({
        'any.required': 'Start date is required. Please provide a start date.',
        'date.format': 'Invalid start date format. Please use ISO format.',
      }),
      enddate: Joi.date().iso().greater(Joi.ref('startdate')).allow(null).messages({
        'date.base': 'Invalid end date format. Please use ISO format.',
        'date.greater': 'End date must be greater than the start date.',
      }),
    }))
    .required()
    .messages({
      'any.required': 'Qualifications are required. Please provide at least one qualification.',
      'array.min': 'At least one qualification is required.',
    }),
})

const profilenamevalidate = Joi.object({
    profileName:Joi.string()
    .required()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9]/)
    .messages({
        "string.pattern.base": "profilename field only contains alphabets and numbers",
        "string.min": "profilename field must be at least 3 characters long",
        "any.required": "profilename field is required",
        "string.empty": "profilename field should not be empty. Please provide a value for the profilename field.",
      })
})

const profilesummaryvalidate = Joi.object({
    profileSummary:Joi.string()
    .required()
    .min(5)
    .max(50)
    .pattern(/^[a-zA-Z0-9]/)
    .messages({
        "string.pattern.base": "profileSummary field only contains alphabets and numbers",
        "string.min": "profileSummary field must be at least 5 characters long",
        "any.required": "profileSummary field is required",
        "string.empty": "profileSummary field should not be empty. Please provide a value for the profileSummary field.",
      })
})

const workexperiencevalidate = Joi.object({
    workExperiences: Joi.array().items(Joi.object({
      jobTitle: Joi.string().required().messages({
        'any.required': 'Job title is required. Please provide a job title.',
        'string.empty': 'Job title cannot be empty.',
      }),
      companyName: Joi.string().required().messages({
        'any.required': 'Company name is required. Please provide a company name.',
        'string.empty': 'Company name cannot be empty.',
      }),
      summary: Joi.string().required().messages({
        'any.required': 'Summary is required. Please provide a summary.',
        'string.empty': 'Summary cannot be empty.',
      }),
      serviceStart: Joi.date().iso().required().messages({
        'any.required': 'Start date is required. Please provide a start date.',
        'date.format': 'Invalid start date format. Please use ISO format.',
      }),
      serviceEnd: Joi.date().iso().greater(Joi.ref('serviceStart')).allow(null).messages({
        'date.base': 'Invalid end date format. Please use ISO format.',
        'date.greater': 'End date must be greater than the start date.',
      }),
    }))
    .required()
    .messages({
      'any.required': 'Work experiences are required. Please provide at least one work experience.',
      'array.min': 'At least one work experience is required.',
    }),
}); 

export {profilenamevalidate,profilesummaryvalidate,workexperiencevalidate,skillvalidate,qualificationvalidate}