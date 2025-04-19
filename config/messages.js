/**
 * Centralized message configuration
 * Contains all error and success messages used throughout the application
 */

const errorMessages = {
    // Authentication Errors
    AUTH: {
        NO_TOKEN: 'No token, authorization denied',
        INVALID_TOKEN: 'Token is not valid',
        INVALID_CREDENTIALS: 'Invalid credentials',
        EMAIL_EXISTS: 'Email already exists',
        INVALID_AUTH_PROVIDER: (providers) => `Invalid auth_provider. Must be one of: ${providers.join(', ')}`,
        INVALID_EMAIL: 'Invalid email format',
        PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
        PASSWORD_REQUIRED: 'Password is required'
    },

    // User Errors
    USER: {
        NOT_FOUND: 'User not found',
        INVALID_UPDATE: 'Invalid user update data',
        DELETE_FAILED: 'Failed to delete user'
    },

    // List Errors
    LIST: {
        NOT_FOUND: 'List not found',
        CREATE_FAILED: 'Failed to create list',
        UPDATE_FAILED: 'Failed to update list',
        DELETE_FAILED: 'Failed to delete list',
        INVALID_DATA: 'Invalid list data'
    },

    // Shopping List Errors
    SHOPPING_LIST: {
        NOT_FOUND: 'Shopping list not found',
        CREATE_FAILED: 'Failed to create shopping list',
        UPDATE_FAILED: 'Failed to update shopping list',
        DELETE_FAILED: 'Failed to delete shopping list',
        INVALID_DATA: 'Invalid shopping list data'
    },

    // Item Errors
    ITEM: {
        NOT_FOUND: 'Item not found',
        CREATE_FAILED: 'Failed to create item',
        UPDATE_FAILED: 'Failed to update item',
        DELETE_FAILED: 'Failed to delete item',
        INVALID_DATA: 'Invalid item data'
    },

    // Database Errors
    DATABASE: {
        CONNECTION_ERROR: 'Database connection error',
        QUERY_ERROR: 'Database query error'
    },

    // Validation Errors
    VALIDATION: {
        REQUIRED_FIELD: (field) => `${field} is required`,
        INVALID_FORMAT: (field) => `Invalid ${field} format`,
        INVALID_LENGTH: (field, min, max) => `${field} must be between ${min} and ${max} characters`
    }
};

const successMessages = {
    // Authentication Success
    AUTH: {
        REGISTER_SUCCESS: 'User registered successfully',
        LOGIN_SUCCESS: 'Login successful',
        LOGOUT_SUCCESS: 'Logout successful'
    },

    // User Success
    USER: {
        CREATED: 'User created successfully',
        UPDATED: 'User updated successfully',
        DELETED: 'User deleted successfully',
        RETRIEVED: 'User retrieved successfully'
    },

    // List Success
    LIST: {
        CREATED: 'List created successfully',
        UPDATED: 'List updated successfully',
        DELETED: 'List deleted successfully',
        RETRIEVED: 'List retrieved successfully'
    },

    // Shopping List Success
    SHOPPING_LIST: {
        CREATED: 'Shopping list created successfully',
        UPDATED: 'Shopping list updated successfully',
        DELETED: 'Shopping list deleted successfully',
        RETRIEVED: 'Shopping list retrieved successfully'
    },

    // Item Success
    ITEM: {
        CREATED: 'Item created successfully',
        UPDATED: 'Item updated successfully',
        DELETED: 'Item deleted successfully',
        RETRIEVED: 'Item retrieved successfully'
    }
};

module.exports = {
    errorMessages,
    successMessages
}; 