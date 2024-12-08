import { createResponse } from '../utils/responseModel.js';

/**
 * List of password criteria that must be met for both new and reset passwords.
 * @type {Array<{test: RegExp, message: string}>}
 * It checks if the password meets the following conditions:
 * - At least 6 characters long.
 * - Contains at least one uppercase letter.
 * - Contains at least one lowercase letter.
 * - Contains at least one number.
 * - Contains at least one special character.
 */
const passwordCriteria = [
    { test: /.{6,}/, message: "Password must be at least 6 characters long" },
    { test: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
    { test: /[a-z]/, message: "Password must contain at least one lowercase letter" },
    { test: /\d/, message: "Password must contain at least one number" },
    { test: /[^A-Za-z0-9]/, message: "Password must contain at least one special character" },
];

/**
 * Middleware function to validate the new password against predefined criteria.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function to call if validation passes.
 * @returns {Object} - Returns a response with status 400 if validation fails.
 */
export const validatePassword = (req, res, next) => {
    const { password } = req.body;

    // Check if all criteria are met
    for (let criterion of passwordCriteria) {
        if (!criterion.test.test(password)) {
            return res.status(400).json(createResponse(
                false,
                400,
                criterion.message
            ));
        }
    }

    next();
};

/**
 * Middleware function to validate the reset password against predefined criteria.
 * This is similar to the `validatePassword` middleware but specifically for password resets.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function to call if validation passes.
 * @returns {Object} - Returns a response with status 400 if validation fails.
 */
export const validateResetPassword = (req, res, next) => {
    const { newPassword } = req.body;

    // Check if all criteria are met for reset password
    for (let criterion of passwordCriteria) {
        if (!criterion.test.test(newPassword)) {
            return res.status(400).json(createResponse(
                false,
                400,
                criterion.message
            ));
        }
    }

    next();
};
