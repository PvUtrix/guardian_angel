# Guardian Angel - System Architecture

## Overview
Guardian Angel is a child safety platform that enables parents to monitor their children's routes to activities (ages 12+) with real-time GPS tracking and intelligent alert systems.

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │  Web Dashboard  │    │   Admin Panel   │
│   (Child/Parent)│    │   (Parents)     │    │   (Support)     │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │     API Gateway          │
                    │   (Authentication,       │
                    │    Rate Limiting,        │
                    │    Load Balancing)       │
                    └─────────────┬─────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                       │                        │
┌───────▼────────┐    ┌─────────▼─────────┐    ┌─────────▼─────────┐
│  Auth Service  │    │  Route Service    │    │ Location Service  │
│  (JWT, OAuth)  │    │ (CRUD, Geofences)│    │ (GPS, Tracking)   │
└────────────────┘    └───────────────────┘    └───────────────────┘
        │                       │                        │
        └───────────────────────┼────────────────────────┘
                               │
                    ┌───────────▼───────────┐
                    │   Alert Service       │
                    │ (Push, SMS, Calls)    │
                    └───────────┬───────────┘
                               │
                    ┌───────────▼───────────┐
                    │   Database Layer      │
                    │ (PostgreSQL + Redis)  │
                    └───────────────────────┘
```

## Technology Stack

### Frontend
- **Mobile Apps**: React Native (iOS/Android)
- **Web Dashboard**: Next.js 14+ with TypeScript
- **UI Framework**: Tailwind CSS + Headless UI
- **State Management**: Zustand (mobile), React Query (web)
- **Maps**: Google Maps API / Mapbox

### Backend
- **API Framework**: NestJS (Node.js)
- **Database**: PostgreSQL (primary), Redis (caching/sessions)
- **Real-time**: WebSockets (Socket.io)
- **Authentication**: JWT + OAuth (Google/Apple)
- **File Storage**: AWS S3 / CloudFlare R2

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (production)
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **CDN**: CloudFlare

## Core Services

### 1. Authentication Service
- **JWT-based authentication** with refresh tokens
- **OAuth integration** (Google, Apple, Facebook)
- **Role-based access control** (Parent, Child, Admin)
- **Multi-factor authentication** for parents
- **Session management** with Redis

### 2. Route Management Service
- **Route creation** with waypoints and geofences
- **Route templates** for common destinations
- **Route sharing** between parent and child
- **Route validation** and safety scoring
- **Historical route analysis**

### 3. Location Tracking Service
- **Real-time GPS tracking** with configurable intervals
- **Background location updates** (iOS/Android)
- **Geofence monitoring** with enter/exit events
- **Location history** with privacy controls
- **Battery optimization** for mobile devices

### 4. Alert System
- **Multi-channel alerts**: Push notifications, SMS, voice calls
- **Escalation logic**: Push → SMS → Auto-call
- **Customizable alert rules** per route
- **Emergency protocols** with SOS functionality
- **Alert history** and analytics

### 5. User Management Service
- **Parent-child relationships** with consent flows
- **Profile management** with privacy settings
- **Family group management**
- **Contact management** for emergency contacts
- **Notification preferences**

## Data Models

### Core Entities

#### User
```typescript
interface User {
  id: string;
  email: string;
  phone?: string;
  role: 'parent' | 'child' | 'admin';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    dateOfBirth?: Date;
  };
  settings: {
    notifications: NotificationSettings;
    privacy: PrivacySettings;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Route
```typescript
interface Route {
  id: string;
  name: string;
  description?: string;
  parentId: string;
  childId: string;
  waypoints: Waypoint[];
  geofences: Geofence[];
  isActive: boolean;
  settings: {
    alertOnDeviation: boolean;
    deviationThreshold: number; // meters
    checkInRequired: boolean;
    maxSpeed: number; // km/h
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Location
```typescript
interface Location {
  id: string;
  userId: string;
  routeId?: string;
  coordinates: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: Date;
  speed?: number;
  heading?: number;
  batteryLevel?: number;
  isMoving: boolean;
}
```

#### Alert
```typescript
interface Alert {
  id: string;
  userId: string;
  routeId?: string;
  type: 'deviation' | 'geofence_exit' | 'check_in_missed' | 'emergency' | 'speed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  channels: ('push' | 'sms' | 'call')[];
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  metadata: Record<string, any>;
  createdAt: Date;
  resolvedAt?: Date;
}
```

## Security & Privacy

### Data Protection
- **End-to-end encryption** for location data
- **Data retention policies** (automatic deletion after 30 days)
- **GDPR compliance** with data export/deletion
- **COPPA compliance** for children under 13
- **Parental consent** flows for all data collection

### Security Measures
- **API rate limiting** and DDoS protection
- **Input validation** and sanitization
- **SQL injection prevention**
- **XSS protection** with CSP headers
- **Secure headers** (HSTS, X-Frame-Options)
- **Regular security audits**

### Privacy Controls
- **Granular privacy settings** per user
- **Location sharing controls** (real-time vs. check-ins only)
- **Data anonymization** for analytics
- **Consent management** with audit trails
- **Right to be forgotten** implementation

## Real-time Tracking

### GPS Optimization
- **Adaptive tracking intervals** based on movement
- **Battery-aware tracking** with reduced frequency when stationary
- **Network-aware updates** (WiFi vs. cellular)
- **Background processing** with iOS/Android best practices

### Geofence Management
- **Dynamic geofence creation** around routes
- **Multi-polygon support** for complex routes
- **Geofence optimization** to reduce battery drain
- **Real-time geofence monitoring** with WebSocket updates

## Alert System Architecture

### Alert Pipeline
```
Location Update → Deviation Check → Alert Generation → Channel Selection → Delivery
```

### Escalation Logic
1. **Immediate**: Push notification to parent app
2. **30 seconds**: SMS to parent's phone
3. **2 minutes**: Automatic call to parent
4. **5 minutes**: Emergency contact notification
5. **10 minutes**: Local authorities (if configured)

### Alert Channels
- **Push Notifications**: Firebase Cloud Messaging
- **SMS**: Twilio / AWS SNS
- **Voice Calls**: Twilio Voice API
- **Email**: SendGrid / AWS SES
- **In-app**: Real-time WebSocket updates

## Performance Considerations

### Scalability
- **Horizontal scaling** with load balancers
- **Database sharding** by user ID
- **Caching strategy** with Redis
- **CDN integration** for static assets
- **Microservices architecture** for independent scaling

### Monitoring
- **Application metrics** with Prometheus
- **Real-time dashboards** with Grafana
- **Error tracking** with Sentry
- **Performance monitoring** with New Relic
- **Uptime monitoring** with Pingdom

## Deployment Strategy

### Development
- **Local development** with Docker Compose
- **Feature branches** with automated testing
- **Code review** process with GitHub Actions
- **Staging environment** for testing

### Production
- **Blue-green deployment** for zero downtime
- **Database migrations** with rollback capability
- **Health checks** and monitoring
- **Auto-scaling** based on load
- **Disaster recovery** procedures

## Compliance & Legal

### Regulatory Compliance
- **COPPA** (Children's Online Privacy Protection Act)
- **GDPR** (General Data Protection Regulation)
- **CCPA** (California Consumer Privacy Act)
- **Local privacy laws** in target markets

### Safety Standards
- **Child safety protocols** with emergency procedures
- **Data breach notification** procedures
- **Regular security audits** and penetration testing
- **Privacy impact assessments** for new features
