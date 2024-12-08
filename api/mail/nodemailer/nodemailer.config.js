import { config } from "../../config/index.js";
import nodemailer from "nodemailer";

const EMAIL_USER = config.nodemailer.user;
const EMAIL_PASS = config.nodemailer.pass;
const EMAIL_SENDER = config.nodemailer.sender;
const EMAIL_SERVICE = config.nodemailer.service;

/**
 * Creates a Nodemailer transport client for sending emails.
 * @type {nodemailer.Transporter}
 */
export const nodemailerClient = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

/**
 * Sends an email using the Nodemailer client.
 *
 * @param {Object} options - Email options for sending.
 * @param {string} options.to - Recipient email address.
 * @param {string} options.subject - Subject of the email.
 * @param {string} options.html - HTML content of the email body.
 * @returns {Promise<void>} - Resolves if the email is successfully sent, otherwise throws an error.
 * @throws {Error} - Throws an error if the email fails to send.
 */
export const sendEmail = async ({ to, subject, html }) => {
    try {
        await nodemailerClient.sendMail({
            from: EMAIL_SENDER,
            to,
            subject,
            html,
        });

        console.log(`Email sent to ${to} with subject: ${subject}`);
    } catch (error) {
        console.error(`Error sending email with subject: "${subject}"`, error);
        throw new Error(`Failed to send email with subject "${subject}": ${error.message}`);
    }
};
