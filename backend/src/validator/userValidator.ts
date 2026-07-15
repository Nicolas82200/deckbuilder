import Joi from "joi";

export interface ValidationErrors {
	errorCount: number;
	errorMessages: { message: string }[];
}

const userSchema = Joi.object({
	name: Joi.string().min(3).max(100).presence("required"),
	email: Joi.string().email().presence("required"),
	password: Joi.string().min(8).max(42).presence("required"),
}).required();

const validateUser = (user: unknown): ValidationErrors | false => {
	const { error } = userSchema.validate(user, { abortEarly: false });
	if (!error) return false;

	return {
		errorCount: error.details.length,
		errorMessages: error.details.map((d) => ({ message: d.message })),
	};
};

export default validateUser;
