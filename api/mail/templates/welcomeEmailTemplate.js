const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Nepali News Portal</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #FF5252, #FF1744); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Our Nepali News Portal!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <span style="font-weight: bold; color: #FF5252;">{name}</span>,</p>
    <p>We're excited to have you on board! Below are your details:</p>
    <ul style="list-style-type: none; padding: 0; margin: 20px 0;">
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
    </ul>
    <p>Feel free to explore and get started with all the features we have to offer.</p>
    <p>If you have any questions, don't hesitate to reach out. We're here to help!</p>
    <p>Best regards,<br>NepaliNews&trade;</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export default WELCOME_EMAIL_TEMPLATE;
