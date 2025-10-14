# Guardian Angel - API Design

## API Overview

The Guardian Angel API follows RESTful principles with GraphQL for complex queries. All endpoints require authentication via JWT tokens.

**Base URL**: `https://api.guardianangel.app/v1`

## Authentication

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Endpoints

#### POST /auth/register
Register a new user (parent or child)

**Request Body:**
```json
{
  "email": "parent@example.com",
  "password": "securePassword123",
  "role": "parent",
  "profile": {
    "firstName": "Анна",
    "lastName": "Иванова",
    "dateOfBirth": "1985-03-15"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "parent@example.com",
      "role": "parent",
      "profile": {
        "firstName": "Анна",
        "lastName": "Иванова"
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

#### POST /auth/login
Authenticate user

**Request Body:**
```json
{
  "email": "parent@example.com",
  "password": "securePassword123"
}
```

#### POST /auth/refresh
Refresh access token

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## User Management

#### GET /users/profile
Get current user profile

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "parent@example.com",
    "role": "parent",
    "profile": {
      "firstName": "Анна",
      "lastName": "Иванова",
      "avatar": "https://cdn.guardianangel.app/avatars/user_123.jpg"
    },
    "settings": {
      "notifications": {
        "push": true,
        "sms": true,
        "email": true
      },
      "privacy": {
        "locationSharing": "real-time",
        "dataRetention": 30
      },
      "language": "ru"
    }
  }
}
```

#### PUT /users/profile
Update user profile

#### GET /users/children
Get list of children for parent

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "child_456",
      "profile": {
        "firstName": "Максим",
        "lastName": "Иванов",
        "dateOfBirth": "2010-05-20"
      },
      "isOnline": true,
      "lastSeen": "2024-01-15T14:30:00Z"
    }
  ]
}
```

#### POST /users/children
Add child to parent account

**Request Body:**
```json
{
  "email": "child@example.com",
  "profile": {
    "firstName": "Максим",
    "lastName": "Иванов",
    "dateOfBirth": "2010-05-20"
  }
}
```

## Route Management

#### GET /routes
Get all routes for current user

**Query Parameters:**
- `status`: `active` | `inactive` | `all`
- `childId`: Filter by child ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "route_789",
      "name": "Дом → Школа",
      "description": "Ежедневный маршрут в школу",
      "childId": "child_456",
      "childName": "Максим",
      "waypoints": [
        {
          "id": "wp_1",
          "name": "Дом",
          "coordinates": {
            "latitude": 55.7558,
            "longitude": 37.6176
          },
          "order": 1
        },
        {
          "id": "wp_2",
          "name": "Школа №123",
          "coordinates": {
            "latitude": 55.7658,
            "longitude": 37.6276
          },
          "order": 2
        }
      ],
      "geofences": [
        {
          "id": "gf_1",
          "name": "Безопасная зона",
          "type": "polygon",
          "coordinates": [
            [55.7558, 37.6176],
            [55.7658, 37.6176],
            [55.7658, 37.6276],
            [55.7558, 37.6276]
          ],
          "radius": 50
        }
      ],
      "isActive": true,
      "settings": {
        "alertOnDeviation": true,
        "deviationThreshold": 100,
        "checkInRequired": true,
        "maxSpeed": 50
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### POST /routes
Create new route

**Request Body:**
```json
{
  "name": "Дом → Школа",
  "description": "Ежедневный маршрут в школу",
  "childId": "child_456",
  "waypoints": [
    {
      "name": "Дом",
      "coordinates": {
        "latitude": 55.7558,
        "longitude": 37.6176
      },
      "order": 1
    },
    {
      "name": "Школа №123",
      "coordinates": {
        "latitude": 55.7658,
        "longitude": 37.6276
      },
      "order": 2
    }
  ],
  "settings": {
    "alertOnDeviation": true,
    "deviationThreshold": 100,
    "checkInRequired": true,
    "maxSpeed": 50
  }
}
```

#### PUT /routes/:id
Update route

#### DELETE /routes/:id
Delete route

#### POST /routes/:id/activate
Activate route for tracking

#### POST /routes/:id/deactivate
Deactivate route

## Location Tracking

#### POST /locations
Report location update

**Request Body:**
```json
{
  "coordinates": {
    "latitude": 55.7558,
    "longitude": 37.6176,
    "accuracy": 5.0
  },
  "timestamp": "2024-01-15T14:30:00Z",
  "speed": 15.5,
  "heading": 180,
  "batteryLevel": 85,
  "isMoving": true,
  "routeId": "route_789"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "locationId": "loc_123",
    "deviation": {
      "isDeviated": false,
      "distance": 25.5,
      "threshold": 100
    },
    "geofenceStatus": {
      "inside": true,
      "geofenceId": "gf_1"
    }
  }
}
```

#### GET /locations/history
Get location history

**Query Parameters:**
- `userId`: User ID (for parents viewing child's history)
- `startDate`: ISO date string
- `endDate`: ISO date string
- `limit`: Number of records (default: 100)

#### GET /locations/current
Get current location of user/child

## Alerts

#### GET /alerts
Get alerts for current user

**Query Parameters:**
- `status`: `pending` | `sent` | `delivered` | `failed`
- `type`: `deviation` | `geofence_exit` | `check_in_missed` | `emergency`
- `startDate`: ISO date string
- `endDate`: ISO date string

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "alert_123",
      "type": "deviation",
      "severity": "medium",
      "message": "Максим отклонился от маршрута на 150 метров",
      "channels": ["push", "sms"],
      "status": "delivered",
      "metadata": {
        "routeId": "route_789",
        "deviationDistance": 150,
        "threshold": 100
      },
      "createdAt": "2024-01-15T14:35:00Z",
      "resolvedAt": "2024-01-15T14:40:00Z"
    }
  ]
}
```

#### POST /alerts/:id/resolve
Mark alert as resolved

#### POST /alerts/emergency
Trigger emergency alert

**Request Body:**
```json
{
  "message": "Помогите! Я в опасности!",
  "location": {
    "latitude": 55.7558,
    "longitude": 37.6176
  }
}
```

## WebSocket Events

### Connection
```javascript
const socket = io('https://api.guardianangel.app', {
  auth: {
    token: 'jwt_token'
  }
});
```

### Events

#### location:update
Real-time location updates
```json
{
  "userId": "child_456",
  "location": {
    "latitude": 55.7558,
    "longitude": 37.6176,
    "timestamp": "2024-01-15T14:30:00Z",
    "speed": 15.5,
    "isMoving": true
  },
  "deviation": {
    "isDeviated": false,
    "distance": 25.5
  }
}
```

#### alert:new
New alert notification
```json
{
  "alertId": "alert_123",
  "type": "deviation",
  "severity": "medium",
  "message": "Максим отклонился от маршрута",
  "userId": "child_456",
  "routeId": "route_789"
}
```

#### route:status
Route status changes
```json
{
  "routeId": "route_789",
  "status": "started" | "completed" | "deviated" | "paused",
  "userId": "child_456",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Неверные данные запроса",
    "details": {
      "field": "email",
      "reason": "Неверный формат email"
    }
  }
}
```

### Error Codes
- `VALIDATION_ERROR`: Invalid request data
- `AUTHENTICATION_ERROR`: Invalid or missing token
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Location updates**: 60 requests per minute
- **General API**: 100 requests per minute
- **WebSocket connections**: 10 per user

## Pagination

### Request
```
GET /routes?page=1&limit=20
```

### Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```
