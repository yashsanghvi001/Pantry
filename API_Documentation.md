# API Documentation

## **1. Create a List**
**Endpoint:** `POST /api/lists`  
**Description:** Creates a new list for the authenticated user.  
**Payload:**
```json
{
  "name": "Groceries",
  "budget": 100.0
}
```
**Validation Rules:**
- `name`: Required, must not be empty.
- `budget`: Optional, must be a positive number.

**Expected Response:**
- **Success (201):**
  ```json
  {
    "message": "List created successfully",
    "list_id": 1
  }
  ```
- **Error (400):**
  ```json
  {
    "errors": [
      { "msg": "Name is required", "param": "name", "location": "body" }
    ]
  }
  ```

---

## **2. Get All Lists**
**Endpoint:** `GET /api/lists`  
**Description:** Retrieves all lists created by the authenticated user.  

**Expected Response:**
- **Success (200):**
  ```json
  [
    {
      "list_id": 1,
      "name": "Groceries",
      "budget": 100.0,
      "created_at": "2025-04-19T12:00:00Z"
    }
  ]
  ```
- **Error (400):**
  ```json
  {
    "message": "Error message"
  }
  ```

---

## **3. Get a Single List**
**Endpoint:** `GET /api/lists/:id`  
**Description:** Retrieves a specific list by its ID.  

**Expected Response:**
- **Success (200):**
  ```json
  {
    "list_id": 1,
    "name": "Groceries",
    "budget": 100.0,
    "created_at": "2025-04-19T12:00:00Z"
  }
  ```
- **Error (404):**
  ```json
  {
    "message": "List not found"
  }
  ```

---

## **4. Update a List**
**Endpoint:** `PUT /api/lists/:id`  
**Description:** Updates the details of a specific list.  
**Payload:**
```json
{
  "name": "Updated Groceries",
  "budget": 150.0
}
```
**Validation Rules:**
- `name`: Optional, must not be empty.
- `budget`: Optional, must be a positive number.

**Expected Response:**
- **Success (200):**
  ```json
  {
    "message": "List updated successfully"
  }
  ```
- **Error (400):**
  ```json
  {
    "errors": [
      { "msg": "Budget must be a positive number", "param": "budget", "location": "body" }
    ]
  }
  ```

---

## **5. Delete a List**
**Endpoint:** `DELETE /api/lists/:id`  
**Description:** Deletes a specific list by its ID.  

**Expected Response:**
- **Success (200):**
  ```json
  {
    "message": "List deleted successfully"
  }
  ```
- **Error (400):**
  ```json
  {
    "message": "Error message"
  }
  ```

---

## **6. Add an Item to a List**
**Endpoint:** `POST /api/lists/:id/items`  
**Description:** Adds an item to a specific list.  
**Payload:**
```json
{
  "product_id": 123,
  "custom_name": "Milk",
  "quantity": 2
}
```
**Validation Rules:**
- `product_id`: Optional, must be an integer.
- `custom_name`: Optional, must not be empty.
- `quantity`: Required, must be a positive integer.

**Expected Response:**
- **Success (201):**
  ```json
  {
    "message": "Item added to list",
    "item_id": 1
  }
  ```
- **Error (400):**
  ```json
  {
    "errors": [
      { "msg": "Quantity must be a positive integer", "param": "quantity", "location": "body" }
    ]
  }
  ```

---

## **7. Update a List Item**
**Endpoint:** `PUT /api/lists/items/:itemId`  
**Description:** Updates the details of a specific list item.  
**Payload:**
```json
{
  "quantity": 3,
  "in_cart": true
}
```
**Validation Rules:**
- `quantity`: Optional, must be a positive integer.
- `in_cart`: Optional, must be a boolean.

**Expected Response:**
- **Success (200):**
  ```json
  {
    "message": "List item updated successfully"
  }
  ```
- **Error (400):**
  ```json
  {
    "errors": [
      { "msg": "Quantity must be a positive integer", "param": "quantity", "location": "body" }
    ]
  }
  ```

---

## **8. Delete a List Item**
**Endpoint:** `DELETE /api/lists/items/:itemId`  
**Description:** Deletes a specific item from a list.  

**Expected Response:**
- **Success (200):**
  ```json
  {
    "message": "List item deleted successfully"
  }
  ```
- **Error (400):**
  ```json
  {
    "message": "Error message"
  }
  ```

---

## **9. Share a List**
**Endpoint:** `POST /api/lists/:id/share`  
**Description:** Shares a list with another user via email.  
**Payload:**
```json
{
  "email": "example@example.com"
}
```
**Validation Rules:**
- `email`: Required, must be a valid email address.

**Expected Response:**
- **Success (200):**
  ```json
  {
    "message": "List shared successfully"
  }
  ```
- **Error (400):**
  ```json
  {
    "errors": [
      { "msg": "Invalid email", "param": "email", "location": "body" }
    ]
  }
  ```

---

### Notes:
- Replace `:id` and `:itemId` with the actual list or item IDs.
- Ensure the `Authorization` header is included with a valid JWT token for all endpoints requiring authentication:
  ```
  Authorization: Bearer <token>
  ```