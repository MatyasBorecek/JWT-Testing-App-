# JWT Authentication Server with JSON Server

This project provides a simple Node.js Express server demonstrating JWT (JSON Web Token) authentication alongside `json-server` for a basic REST API backend. It includes user registration, login, protected routes, and role-based access control (admin).

## Features

-   **User Registration**: `/auth/register` endpoint to create new users with hashed passwords.
-   **User Login**: `/auth/login` endpoint to authenticate users and receive a JWT.
-   **JWT Authentication**: Middleware to verify JWT tokens for protected routes.
-   **Protected Routes**: Example route (`/users`) accessible only to authenticated users.
-   **Role-Based Access Control**: Example route (`/admin`) accessible only to users with the 'admin' role.
-   **JSON Server Integration**: Uses `json-server` to serve a simple REST API from `db.json` at the `/api` prefix.
-   **Environment Variables**: Configuration managed via a `.env` file.
-   **Modern JavaScript**: Uses ES Modules, async/await, and modern Node.js practices.
-   **Modular Structure**: Code organized into controllers, routes, middleware, utils, and config directories.
-   **Health Check**: `/health` endpoint to verify server status.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1.  **Clone the repository:**
    ```
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```
    npm install
    # or
    yarn install
    ```

## Configuration

1.  Create a `.env` file in the root directory of the project.
2.  Add the following environment variables:

    ```
    PORT=3001
    JWT_SECRET=your_super_secret_and_long_random_string_here
    JWT_EXPIRES_IN=1h
    ```

    -   `PORT`: The port the server will run on (defaults to 3001).
    -   `JWT_SECRET`: A strong, secret string used to sign the JWTs. **Change this to a secure, random value.**
    -   `JWT_EXPIRES_IN`: How long the JWT token will be valid (e.g., `1h`, `7d`, `30m`).

3.  The project includes a `db.json` file. You can modify this file to add initial users or change the data structure served by `json-server`. Ensure at least one user exists for testing login, or use the register endpoint first. *Remember to hash passwords if adding users manually.* You can generate bcrypt hashes using online tools or simple scripts for testing purposes.

## Running the Server

-   **Development Mode (with hot-reloading using nodemon):**
    ```
    npm run dev
    # or
    yarn dev
    ```

-   **Production Mode:**
    ```
    npm start
    # or
    yarn start
    ```

The server will start on the port specified in your `.env` file (or 3001 by default).

## API Endpoints

### Authentication

-   **`POST /auth/register`**: Register a new user.
    -   **Request Body**: `{ "email": "user@example.com", "password": "yourpassword", "username": "yourusername" }`
    -   **Response (Success 201)**: `{ "accessToken": "your_jwt_token" }`
    -   **Response (Error 400)**: If user already exists or validation fails.

-   **`POST /auth/login`**: Authenticate a user and get a JWT.
    -   **Request Body**: `{ "email": "user@example.com", "password": "yourpassword" }`
    -   **Response (Success 200)**: `{ "accessToken": "your_jwt_token" }`
    -   **Response (Error 401)**: If credentials are invalid.

### User Routes (Protected)

-   **`GET /users`**: Get a list of all users (excluding passwords).
    -   **Requires Authentication**: `Authorization: Bearer <your_jwt_token>` header.
    -   **Response (Success 200)**: `[ { "id": 1, "email": "...", "username": "...", "role": "..." }, ... ]`
    -   **Response (Error 401/403)**: If not authenticated or token is invalid/expired.

### Admin Routes (Protected & Role-Restricted)

-   **`GET /admin`**: Access an admin-only resource.
    -   **Requires Authentication**: `Authorization: Bearer <your_jwt_token>` header.
    -   **Requires Role**: User associated with the token must have `role: "admin"`.
    -   **Response (Success 200)**: `{ "message": "Welcome, admin!", "user": { ...user_payload... } }`
    -   **Response (Error 401/403)**: If not authenticated, token is invalid/expired, or user is not an admin.

### JSON Server API

-   **`GET /api/<resource>`**: Access resources defined in `db.json` (e.g., `/api/posts`, `/api/comments`). Refer to [json-server documentation](https://github.com/typicode/json-server) for available routes based on your `db.json`.
    -   **Note**: These routes are *not* protected by JWT in this basic setup.

### Health Check

-   **`GET /health`**: Check if the server is running.
    -   **Response (Success 200)**: `{ "status": "UP", "message": "JWT Test Server is running!" }`

## Technologies Used

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/) - Web framework
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For creating and verifying JWTs
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - For hashing passwords
-   [cors](https://github.com/expressjs/cors) - For enabling Cross-Origin Resource Sharing
-   [dotenv](https://github.com/motdotla/dotenv) - For loading environment variables
-   [json-server](https://github.com/typicode/json-server) - For creating a mock REST API
-   [nodemon](https://nodemon.io/) - For development (auto-restarting the server)

