# Virtual-Event-Management-Platform

This is a simple Node.js project that provides a Virtual-Event-Management-Platform. This project uses JavaScript and is managed with npm.

### Prerequisites

You need to have Node.js and npm installed on your machine. If you don't have Node.js installed, you can download it from [here](https://nodejs.org/en/download/).

### Installing

1. Clone the repository:
    ```
    git clone https://github.com/aytrivedi/Virtual-Event-Management-Platform.git
    ```

2. Navigate to the project directory:
    ```
    cd Virtual-Event-Management-Platform
    ```

3. Install the dependencies:
    ```
    npm install
    ```

## Running the Application

To start the application, run the following command in the project directory:

```
node app.js
```

## Running the Tests

To run the tests, use the following command:

```
npm test
```

## API Endpoints

The application provides the following endpoints:

- `POST /users/register`: Signup to create your user.
- `POST /users/login`: Login using email and password .
- `GET /events/`: Fetches list of events.
- `POST /events`: Post a new event by admin user.
- `PUT /events/:id`: Update an event by an admin user.
- `DELETE /events/:id`: Delete an events by admin user.
- `POST /events/:id/register`: Register to participate in an event by a user and post registration a confirmation email is sent asynchronuously.


## Built With

- [Node.js](https://nodejs.org/) - The runtime environment
- [express](https://expressjs.com/) - The web framework
- [npm](https://www.npmjs.com/) - Dependency Management
- [nodemailer](https://modemailer.com/) - NPM package to send emails via NodeJs application.
