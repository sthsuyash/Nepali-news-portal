import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
	VERIFICATION_EMAIL_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	PASSWORD_RESET_REQUEST_TEMPLATE,
} from "../templates/index.js";

/**
 * Sends a verification email to the user with a verification token.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} verificationToken - The token to verify the user's email.
 * @returns {Promise<void>} - Resolves when the email is successfully sent.
 * @throws {Error} - Throws an error if the email fails to send.
 */
export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});
	} catch (error) {
		console.error(`Error sending verification email to ${email}`, error);
		throw new Error(`Error sending verification email: ${error.message}`);
	}
};

/**
 * Sends a welcome email to the user after successful registration.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} name - The name of the recipient.
 * @returns {Promise<void>} - Resolves when the email is successfully sent.
 * @throws {Error} - Throws an error if the email fails to send.
 */
export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

	try {
		await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
			template_variables: {
				company_info_name: "Auth Company", // Replace with actual company info
				name: name,
			},
		});
	} catch (error) {
		console.error(`Error sending welcome email to ${email}`, error);
		throw new Error(`Error sending welcome email: ${error.message}`);
	}
};

/**
 * Sends a password reset email to the user with a reset URL.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} resetURL - The URL for the user to reset their password.
 * @returns {Promise<void>} - Resolves when the email is successfully sent.
 * @throws {Error} - Throws an error if the email fails to send.
 */
export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email to ${email}`, error);
		throw new Error(`Error sending password reset email: ${error.message}`);
	}
};

/**
 * Sends a confirmation email after the password has been successfully reset.
 * 
 * @param {string} email - The recipient's email address.
 * @returns {Promise<void>} - Resolves when the email is successfully sent.
 * @throws {Error} - Throws an error if the email fails to send.
 */
export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset success email to ${email}`, error);
		throw new Error(`Error sending password reset success email: ${error.message}`);
	}
};
