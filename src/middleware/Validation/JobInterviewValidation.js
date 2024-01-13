import Joi from 'joi';

const interviewValidation = Joi.object({
    dateScheduled: Joi.date().required().messages({
        'any.required': 'date is required',
        'date.empty':'date should not be empty'
    }),

    status: Joi.string().messages({
        'any.required': 'status is required',
        'date.empty':'status should not be empty'
    })
})

export {interviewValidation}