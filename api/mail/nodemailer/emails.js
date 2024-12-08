import { sendEmail } from "./nodemailer.config.js";
import { applyTemplateReplacements } from "../emailHelper.js";

import {
    WELCOME_EMAIL_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
} from "../templates/index.js"

/**
 * Sends a verification email with a verification code.
 * @param {string} email - Recipient email address.
 * @param {string} verificationToken - Verification code to include in the email.
 * @returns {Promise<void>} - Resolves if the email is sent successfully.
 */
export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationHtml = applyTemplateReplacements(
        VERIFICATION_EMAIL_TEMPLATE,
        { verificationCode: verificationToken }
    );

    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: verificationHtml
    });
};

/**
 * Sends a welcome email to a new user.
 * @param {string} email - Recipient email address.
 * @param {string} name - Recipient's name to personalize the email.
 * @returns {Promise<void>} - Resolves if the email is sent successfully.
 */
export const sendWelcomeEmail = async (email, name) => {
    const welcomeHtml = applyTemplateReplacements(
        WELCOME_EMAIL_TEMPLATE,
        { email, name }
    );

    await sendEmail({
        to: email,
        subject: "Welcome to our News Portal",
        html: welcomeHtml
    });
};

/**
 * Sends a password reset email with a reset link.
 * @param {string} email - Recipient email address.
 * @param {string} resetURL - URL for resetting the password.
 * @returns {Promise<void>} - Resolves if the email is sent successfully.
 */
export const sendPasswordResetEmail = async (email, resetURL) => {
    const passwordRequestHtml = applyTemplateReplacements(
        PASSWORD_RESET_REQUEST_TEMPLATE,
        { resetURL }
    );

    await sendEmail({
        to: email,
        subject: "Reset your password",
        html: passwordRequestHtml
    });
};

/**
 * Sends an email confirming a successful password reset.
 * @param {string} email - Recipient email address.
 * @returns {Promise<void>} - Resolves if the email is sent successfully.
 */
export const sendResetSuccessEmail = async (email) => {
    await sendEmail({
        to: email,
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
};
