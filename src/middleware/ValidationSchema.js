import Joi from 'joi'; //importing joi

// Validating schema
const authschema = Joi.object({
    name: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/)
        .messages({
            'string.pattern.base': 'Name field only contains alphabets',
            'string.min': 'Name field must be at least 3 characters long',
            'any.required': 'Name field is required',
            'string.empty': 'Name field should not be empty. Please provide a value for the name field.',
        }),
    description: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/)
        .messages({
            'string.pattern.base': 'Description field only contains alphabets',
            'string.min': 'Description field must be at least 3 characters long',
            'any.required': 'Description field is required',
            'string.empty': 'description field should not be empty. Please provide a value for the description field.',
        }),
});

//validating work experience schema
const experiencevalid = Joi.object({
    jobTitle: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/)
    .messages({
        'string.pattern.base': 'jobTitle field only contains alphabets',
        'string.min': 'jobTitle field must be at least 3 characters long',
        'any.required': 'jobTitle field is required',
        'string.empty': 'jobTitle field should not be empty. Please provide a value for the jobTitle field.',
    }),
    companyName: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/)
    .messages({
        'string.pattern.base': 'companyName field only contains alphabets',
        'string.min': 'companyName field must be at least 3 characters long',
        'any.required': 'companyName field is required',
        'string.empty': 'companyName field should not be empty. Please provide a value for the companyName field.',
    }),
    summary: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/)
    .messages({
        'string.min': 'summary field must be at least 3 characters long',
        'any.required': 'summary field is required',
        'string.empty': 'summary field should not be empty. Please provide a value for the summary field.',
    }),
    serviceStart: Joi.date().required()
    .messages({
        'date.base': 'Start date field must be a valid date',
        'any.required': 'Start date field is required',
    }),
    serviceEnd: Joi.date().required()
    .messages({
        'date.base': 'End date field must be a valid date',
        'any.required': 'End date field is required',
    }),
});

const jobpostvalid=Joi.object({
    jobTitle: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/)
    .messages({
        'string.pattern.base': 'jobTitle field only contains alphabets',
        'string.min': 'jobTitle field must be at least 3 characters long',
        'any.required': 'jobTitle field is required',
        'string.empty': 'jobTitle field should not be empty. Please provide a value for the jobTitle field.',
    }),
    jobSummary:Joi.string().required().min(5).pattern(/^[a-zA-Z\s]+$/)
    .messages({
        'string.pattern.base': 'jobsummary field only contains alphabets',
        'string.min': 'jobsummary field must be at least 3 characters long',
        'any.required': 'jobsummary field is required',
        'string.empty': 'jobsummary field should not be empty. Please provide a value for the jobTitle field.',
    }),


    jobResponsibilities:Joi.string().required().min(5).pattern(/^[a-zA-Z\s]+$/)
    .messages({'string.pattern.base': 'jobResponsibilities field only contains alphabets',
    'string.min': 'jobResponsibilities field must be at least 3 characters long',
    'any.required': 'jobResponsibilities field is required',
    'string.empty': 'jobResponsibilities field should not be empty. Please provide a value for the   jobResponsibilities field.',
    })
});
    const jobapplicationvalid=Joi.object({

        coverletter:Joi.string().required().min(20).pattern(/^[a-zA-Z\s]+$/)
        .messages({
            'string.pattern.base': 'coverletter field only contains alphabets',
            'string.min': 'coverletter field must be at least 3 characters long',
            'any.required': 'coverletter field is required',
            'string.empty': 'coverletter field should not be empty. Please provide a value for the coverletter field.',
        }),

    });


export  {authschema,experiencevalid,jobpostvalid,jobapplicationvalid}
