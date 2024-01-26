# rest-api-typescript

## Overview

Welcome to **rest-api-typescript**, a robust REST API developed with Node.js, TypeScript, Express, and MongoDB. This API empowers you to efficiently manage users, sessions, and products with ease.

## Features

- **User Management**
  - Create a new user: `POST /api/users`
  - Validate user input: `validate(createUserSchema)`
- **Session Management**
  - Create a new session: `POST /api/sessions`
  - Get user sessions: `GET /api/sessions` (requires user authentication)
  - Delete a session: `DELETE /api/sessions` (requires user authentication)
  - Validate session input: `validate(createSessionSchema)`
- **Product Management**
  - Create a new product: `POST /api/products` (requires user authentication)
  - Update a product: `PUT /api/products/:productId` (requires user authentication)
  - Get a product by ID: `GET /api/products/:productId`
  - Delete a product: `DELETE /api/products/:productId` (requires user authentication)
  - Validate product input: `validate(createProductSchema)`, `validate(updateProductSchema)`, `validate(getProductSchema)`, `validate(deleteProductSchema)`

## Getting Started

Follow these steps to get started with **rest-api-typescript**:

1. Clone the repository: `git clone https://github.com/judevector/rest-api-typescript.git`
2. Install dependencies: `yarn install`
3. Set up your MongoDB database and configure the connection in the project.
4. Run the API: `yarn dev`

## Testing

Ensure the reliability of the API by running comprehensive tests:

1. Unit tests
2. Integration tests
3. End-to-end tests with Supertest
