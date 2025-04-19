# Pantry Application

A comprehensive application for managing shopping lists, recipes, and pantry items.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Pantry application is designed to help users manage their shopping lists, recipes, and pantry items. It provides a RESTful API for creating, updating, and deleting lists and items, as well as sharing lists with other users.

## Features

- User authentication and authorization
- Shopping list management
- Recipe management
- Product and store information
- List sharing functionality
- Email verification
- Standardized API responses

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Email**: nodemailer

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pantry.git
   cd pantry
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `pantry_list`
   - Run the SQL script in `schema.sql` to create the necessary tables

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Configuration

The application uses a configuration file located at `config/config.js`. You can modify the following settings:

- Database connection details
- JWT secret and expiration time
- Server port

## API Documentation

### Authentication Endpoints

#### Register a new user
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "auth_provider": "email"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Verify Email
```
GET /api/auth/verify-email?token=your_verification_token
```

### User Endpoints

#### Get User
```
GET /api/users/:id
Authorization: Bearer your_jwt_token
```

#### Update User
```
PUT /api/users/:id
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "email": "updated@example.com",
  "password": "newpassword123"
}
```

#### Delete User
```
DELETE /api/users/:id
Authorization: Bearer your_jwt_token
```

### List Endpoints

#### Create List
```
POST /api/lists
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "My Shopping List",
  "budget": 100.00
}
```

#### Get All Lists
```
GET /api/lists
Authorization: Bearer your_jwt_token
```

#### Get Specific List
```
GET /api/lists/:id
Authorization: Bearer your_jwt_token
```

#### Update List
```
PUT /api/lists/:id
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "Updated List Name",
  "budget": 150.00
}
```

#### Delete List
```
DELETE /api/lists/:id
Authorization: Bearer your_jwt_token
```

#### Add Item to List
```
POST /api/lists/:id/items
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "product_id": 1,
  "custom_name": "Custom Product Name",
  "quantity": 2
}
```

#### Update List Item
```
PUT /api/lists/items/:itemId
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "quantity": 3,
  "in_cart": true
}
```

#### Delete List Item
```
DELETE /api/lists/items/:itemId
Authorization: Bearer your_jwt_token
```

#### Share List
```
POST /api/lists/:id/share
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "email": "friend@example.com"
}
```

### Shopping List Endpoints

#### Create Shopping List
```
POST /api/shopping-lists
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "My Shopping List"
}
```

#### Get All Shopping Lists
```
GET /api/shopping-lists
Authorization: Bearer your_jwt_token
```

#### Get Specific Shopping List
```
GET /api/shopping-lists/:id
Authorization: Bearer your_jwt_token
```

#### Update Shopping List
```
PUT /api/shopping-lists/:id
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "Updated Shopping List Name"
}
```

#### Delete Shopping List
```
DELETE /api/shopping-lists/:id
Authorization: Bearer your_jwt_token
```

#### Add Item to Shopping List
```
POST /api/shopping-lists/:id/items
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}
```

#### Delete Shopping List Item
```
DELETE /api/shopping-lists/items/:itemId
Authorization: Bearer your_jwt_token
```

## Database Schema

The application uses a MySQL database with the following main tables:

- Users
- Lists
- List_Items
- List_Members
- Shopping_Lists
- Shopping_List_Items
- Products
- Categories
- Stores
- Product_Prices
- Recipes
- Recipe_Items
- Coupons
- Ads
- Deals
- Reward_Cards
- Email_Verification_Tokens

## Project Structure

The project follows a layered architecture:

- **Controllers**: Handle HTTP requests and responses
- **BAL (Business Access Layer)**: Contains business logic
- **DAL (Data Access Layer)**: Handles database operations
- **Models**: Define database models using Sequelize
- **Routes**: Define API endpoints
- **Middleware**: Contains middleware functions like authentication
- **Config**: Contains configuration files

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. When a user logs in, they receive a token that must be included in the Authorization header of subsequent requests.

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Handling

The application uses a standardized response format for all API responses:

```json
{
  "isError": false,
  "message": "Success message",
  "response": {
    // Response data
  }
}
```

For errors:
```json
{
  "isError": true,
  "message": "Error message",
  "response": {
    // Additional error details (optional)
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 