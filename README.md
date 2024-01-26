EvaExchange Backend API
Welcome to the EvaExchange Backend API! This project is a part of a trading game developed to educate users on the terminology used in trading shares. It features RESTful APIs for executing BUY and SELL trading operations.

Getting Started
These instructions will guide you on setting up your project locally. To get a local copy up and running, follow these simple steps.

Install NPM packages:
npm install

Create a .env file in the root directory and update it with your database credentials:

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name

Run the application:
For development:
npm run dev

To run unit tests:
npm test

Usage
This API provides endpoints for buying and selling shares:

POST /trade/buy: To buy shares.
POST /trade/sell: To sell shares.
Refer to the included Postman collection for detailed API usage.

Cron Job
A cron job is set up to update share prices hourly. This can be observed in the logs.

Notes
The database is automatically initialized with dummy data for easy testing.
Ensure the database credentials in the .env file are correct to avoid connection issues.
Contact
Orçun Furkan Türkol - ofturkol@gmail.com
