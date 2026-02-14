# CMS API

A Content Management System (CMS) backend API built with Node.js, Express, MongoDB, and Socket.IO for real-time communication.

## Features

- 🔐 **Authentication & Authorization** - JWT-based authentication with bcrypt password hashing and OTP verification
- 📦 **Artifact Management** - Create, read, update, and delete content artifacts with file uploads
- 💬 **Real-time Chat** - WebSocket-based chat functionality using Socket.IO
- 👍 **Likes System** - Toggle likes on artifacts
- 💭 **Comments** - Comment system for artifacts
- ☁️ **Cloud Storage** - Cloudinary integration for media uploads
- ⚡ **Rate Limiting** - API rate limiting for security
- 🔒 **Role-Based Access Control** - Admin and user roles with different permissions
- 🔄 **Scheduled Tasks** - Cron jobs for automated tasks
- 🌐 **CORS Enabled** - Cross-origin resource sharing support

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose v9.2.0
- **Real-time**: Socket.IO v4.8.3
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer v2.0.2
- **Cloud Storage**: Cloudinary v2.9.0
- **Logging**: Morgan
- **Scheduling**: node-cron v4.2.1

## Project Structure

```
CMS_api/
├── config/           # Configuration files (DB, Cloudinary)
├── controllers/      # Route controllers
├── cron/            # Scheduled tasks
├── middlewares/     # Custom middleware functions
│   ├── authmiddleware.js       # JWT authentication
│   ├── rolemiddleware.js       # Role-based authorization
│   ├── uploadsmiddleware.js    # File upload handling
│   └── ratelimitermiddleware.js # API rate limiting
├── models/          # Mongoose models
├── routes/          # API routes
│   ├── authroutes.js
│   ├── artifactroutes.js
│   ├── chatroutes.js
│   ├── commentsroutes.js
│   └── likesroutes.js
├── services/        # Business logic
├── sockets/         # Socket.IO handlers
├── utils/           # Utility functions
├── webhook/         # Webhook handlers
├── app.js           # Express app configuration
├── server.js        # Server entry point
└── package.json     # Dependencies
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LakshmiNarasimha28/CMS_api.git
   cd CMS_api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:8000` (or your specified PORT).

---

## API Documentation

### Base URL
```
http://localhost:8000
```

### Response Format
All API responses follow this standard format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}
}
```

---

## 🔐 Authentication Endpoints

### 1. Initiate Signup
Start the user registration process by sending an OTP to the email.

**Endpoint:** `POST /auth/signup/initiate`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email is required"
}
```

---

### 2. Verify Signup OTP
Complete user registration by verifying the OTP.

**Endpoint:** `POST /auth/signup/verify`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "name": "John Doe",
  "password": "securePassword123",
  "role": "USER"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User signed up successfully",
  "user": {
    "_id": "userId",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

### 3. Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "userId",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "token": "jwt_token_here"
}
```

**Note:** The JWT token is also set as an HTTP-only cookie with the following properties:
- Name: `token`
- HttpOnly: `true`
- Secure: `false` (set to `true` in production)
- SameSite: `lax`
- Max Age: 1 hour (3600000ms)

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 📦 Artifact Endpoints

All artifact endpoints require authentication via JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### 1. Create Artifact
Create a new artifact with optional file upload.

**Endpoint:** `POST /artifacts`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
```
title: "My Artifact Title"
content: "Artifact content goes here"
file: [File]
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Artifact created successfully",
  "artifact": {
    "_id": "artifactId",
    "title": "My Artifact Title",
    "content": "Artifact content goes here",
    "userId": "userId",
    "filePath": "cloudinary_url_or_local_path",
    "createdAt": "2026-02-14T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Error message"
}
```

**Middleware:**
- `authMiddleware` - Validates JWT token
- `upload.single("file")` - Handles single file upload (max 10mb)

---

### 2. Get Artifacts
Retrieve all artifacts (Admin only).

**Endpoint:** `GET /artifacts`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "artifacts": [
    {
      "_id": "artifactId",
      "title": "Artifact Title",
      "content": "Content",
      "userId": "userId",
      "filePath": "path/to/file",
      "createdAt": "2026-02-14T00:00:00.000Z"
    }
  ]
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Access denied. Admin role required."
}
```

**Middleware:**
- `authMiddleware` - Validates JWT token
- `authorizeRoles("ADMIN")` - Checks for admin role
- `apiLimiter` - Rate limits the endpoint

---

## 👍 Likes Endpoints

### Toggle Like on Artifact
Like or unlike an artifact (toggle functionality).

**Endpoint:** `POST /likes/:artifactId`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `artifactId` - The ID of the artifact to like/unlike

**Success Response (200):**
```json
{
  "success": true,
  "message": "Artifact liked",
  "liked": true,
  "likeCount": 5
}
```

Or when unliking:
```json
{
  "success": true,
  "message": "Like removed",
  "liked": false,
  "likeCount": 4
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Artifact not found"
}
```

**Note:** This endpoint uses authentication middleware to identify the user. Calling it again will toggle the like status.

---

## 💭 Comments Endpoints

### 1. Add Comment
Add a comment to an artifact.

**Endpoint:** `POST /comments/:id/comments`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - The artifact ID

**Request Body:**
```json
{
  "text": "This is a great artifact!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "comment": {
    "_id": "commentId",
    "artifactId": "artifactId",
    "userId": "userId",
    "text": "This is a great artifact!",
    "createdAt": "2026-02-14T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Comment text is required"
}
```

**Middleware:**
- `authMiddleware` - Validates JWT token

---

### 2. Get Comments
Retrieve all comments for an artifact.

**Endpoint:** `GET /comments/:id/comments`

**URL Parameters:**
- `id` - The artifact ID

**Success Response (200):**
```json
{
  "success": true,
  "comments": [
    {
      "_id": "commentId",
      "artifactId": "artifactId",
      "userId": {
        "_id": "userId",
        "name": "John Doe"
      },
      "text": "This is a great artifact!",
      "createdAt": "2026-02-14T00:00:00.000Z"
    }
  ]
}
```

**Note:** This endpoint is public (no authentication required).

---

## 💬 Chat Endpoints

All chat endpoints require authentication.

### 1. Get Chat by Thread
Retrieve all messages in a chat thread.

**Endpoint:** `GET /chats/:threadId`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `threadId` - The chat thread ID

**Success Response (200):**
```json
{
  "success": true,
  "messages": [
    {
      "_id": "messageId",
      "threadId": "threadId",
      "senderId": "userId",
      "message": "Hello!",
      "timestamp": "2026-02-14T00:00:00.000Z"
    }
  ]
}
```

**Middleware:**
- `authMiddleware` - Validates JWT token

---

### 2. Send Chat Message
Send a message in a chat thread.

**Endpoint:** `POST /chats`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "threadId": "threadId",
  "message": "Hello, how are you?"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": {
    "_id": "messageId",
    "threadId": "threadId",
    "senderId": "userId",
    "message": "Hello, how are you?",
    "timestamp": "2026-02-14T00:00:00.000Z"
  }
}
```

**Middleware:**
- `authMiddleware` - Validates JWT token

**Note:** Chat messages are also broadcast in real-time via Socket.IO to connected clients.

---

## 🔌 WebSocket (Socket.IO)

The API includes real-time functionality via Socket.IO on the same port as the HTTP server.

**Connection URL:**
```javascript
const socket = io('http://localhost:8000');
```

**CORS Configuration:**
- Origin: `*` (Allow all origins)
- Methods: `[
"GET", "POST"
]`

**Socket Events:**
Socket handlers are registered in `./sockets/sockets.js`. Common events may include:
- Chat message events
- Real-time notifications
- Live updates

Refer to the socket handlers file for specific event names and payloads.

---

## 🔒 Middleware & Security

### Authentication Middleware
- **File:** `middlewares/authmiddleware.js`
- **Purpose:** Validates JWT tokens and attaches user info to `req.user`
- **Usage:** Protects routes requiring authentication

### Role-Based Authorization
- **File:** `middlewares/rolemiddleware.js`
- **Purpose:** Restricts access based on user roles (e.g., ADMIN, USER)
- **Usage:** `authorizeRoles("ADMIN")`

### File Upload Middleware
- **File:** `middlewares/uploadsmiddleware.js`
- **Purpose:** Handles multipart file uploads using Multer
- **Limits:** 10MB for JSON/URL-encoded bodies

### Rate Limiting
- **File:** `middlewares/ratelimitermiddleware.js`
- **Purpose:** Prevents abuse by limiting request rates
- **Applied to:** Sensitive endpoints like `/artifacts` GET

---

## 🧪 Error Handling

All endpoints follow consistent error response formats:

**Client Errors (4xx):**
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

**Server Errors (5xx):**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📋 Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 500  | Internal Server Error |

---

## 🔑 Authentication Flow

1. **Register:**
   - `POST /auth/signup/initiate` → Receive OTP via email
   - `POST /auth/signup/verify` → Complete registration with OTP

2. **Login:**
   - `POST /auth/login` → Receive JWT token

3. **Use Protected Endpoints:**
   - Include token in header: `Authorization: Bearer <token>`

---

## 📝 Development Notes

- **ES Modules:** The project uses ES6 module syntax (`import`/`export`)
- **Environment:** Uses `dotenv` for configuration
- **Database:** Requires MongoDB connection
- **Cloud Storage:** Cloudinary setup required for file uploads
- **Cookie Support:** JWT tokens are sent as HTTP-only cookies

---

## 🚀 Deployment Considerations

When deploying to production:

1. Set `secure: true` for cookie options (requires HTTPS)
2. Configure proper CORS origins (replace `*` with specific domains)
3. Use strong JWT secrets
4. Enable MongoDB authentication
5. Set appropriate rate limits
6. Configure environment variables securely
7. Use HTTPS for all communications

---

## 📚 Dependencies

### Core Dependencies
- **express** (^5.2.1) - Web framework
- **mongoose** (^9.2.0) - MongoDB ODM
- **socket.io** (^4.8.3) - Real-time communication
- **socket.io-client** (^4.8.3) - Socket.IO client
- **jsonwebtoken** (^9.0.3) - JWT authentication
- **bcrypt** (^6.0.0) - Password hashing
- **multer** (^2.0.2) - File upload handling
- **cloudinary** (^2.9.0) - Cloud media storage
- **cors** (^2.8.6) - CORS middleware
- **cookie-parser** (^1.4.7) - Parse cookies
- **express-rate-limit** (^8.2.1) - Rate limiting
- **morgan** (^1.10.1) - HTTP request logger
- **dotenv** (^17.2.4) - Environment configuration
- **node-cron** (^4.2.1) - Task scheduling
- **ngrok** (^5.0.0-beta.2) - Local tunneling

---

## 📄 License

ISC

## 👤 Author

**LakshmiNarasimha28**

## 🔗 Repository

[https://github.com/LakshmiNarasimha28/CMS_api](https://github.com/LakshmiNarasimha28/CMS_api)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!