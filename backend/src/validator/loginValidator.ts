import Joi from "joi";

import { ValidationErrors } from "./userValidator";

const loginSchema = Joi.object({
  email: Joi.string().email().presence("required"),
  password: Joi.string().min(8).max(42).presence("required"),
}).required();

const validateLogin = (credentials: unknown): ValidationErrors | false => {
  const { error } = loginSchema.validate(credentials, { abortEarly: false });
  if (!error) return false;

  return {
    errorCount: error.details.length,
    errorMessages: error.details.map((d) => ({ message: d.message })),
  };
};

export default validateLogin;
