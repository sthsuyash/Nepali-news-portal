import dotenv from 'dotenv';
dotenv.config();

export const config = {
    server: {
        port: parseInt(process.env.PORT) || 5000,
        clientURL: process.env.CLIENT_URL,
        nodeEnv: process.env.NODE_ENV,
        apiURL: process.env.API_URL,
    },
    db: {
        url: process.env.MONGO_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    mailtrap: {
        endpoint: process.env.MAILTRAP_ENDPOINT,
        token: process.env.MAILTRAP_TOKEN,
    },
    nodemailer: {
        service: process.env.EMAIL_SERVICE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        sender: process.env.EMAIL_SENDER,
    },
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: process.env.ADMIN_NAME,
    },
    newsAlgorithm: {
        apiURL: process.env.NEWS_ALGORITHM_API_URL,
    },
};