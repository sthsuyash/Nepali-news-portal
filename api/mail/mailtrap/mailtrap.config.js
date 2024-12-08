import { MailtrapClient } from "mailtrap";

import { config } from "../../config/index.js";
const MAILTRAP_ENDPOINT = config.mailtrap.endpoint;
const MAILTRAP_TOKEN = config.mailtrap.token;

export const mailtrapClient = new MailtrapClient({
	endpoint: MAILTRAP_ENDPOINT,
	token: MAILTRAP_TOKEN,
});

export const sender = {
	email: "hello@demomailtrap.com",
	name: "Mailtrap Test",
};


