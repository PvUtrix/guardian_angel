# Guardian Angel - Database Schema

## Database Design

The Guardian Angel platform uses PostgreSQL as the primary database with Redis for caching and session management.

## Core Tables

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('parent', 'child', 'admin')),
    profile JSONB NOT NULL DEFAULT '{}',
    settings JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### Parent-Child Relationships
```sql
CREATE TABLE family_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship_type VARCHAR(20) DEFAULT 'parent_child',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'terminated')),
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(parent_id, child_id)
);

-- Indexes
CREATE INDEX idx_family_parent_id ON family_relationships(parent_id);
CREATE INDEX idx_family_child_id ON family_relationships(child_id);
CREATE INDEX idx_family_status ON family_relationships(status);
```

### Routes Table
```sql
CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT false,
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    activated_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_routes_parent_id ON routes(parent_id);
CREATE INDEX idx_routes_child_id ON routes(child_id);
CREATE INDEX idx_routes_active ON routes(is_active);
CREATE INDEX idx_routes_created_at ON routes(created_at);
```

### Waypoints Table
```sql
CREATE TABLE waypoints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    coordinates POINT NOT NULL,
    order_index INTEGER NOT NULL,
    radius INTEGER DEFAULT 50, -- meters
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_waypoints_route_id ON waypoints(route_id);
CREATE INDEX idx_waypoints_order ON waypoints(route_id, order_index);
CREATE INDEX idx_waypoints_coordinates ON waypoints USING GIST(coordinates);
```

### Geofences Table
```sql
CREATE TABLE geofences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('circle', 'polygon')),
    coordinates JSONB NOT NULL, -- For circle: {center: [lat, lng], radius: number}, For polygon: {points: [[lat, lng], ...]}
    is_safe_zone BOOLEAN DEFAULT true,
    alert_on_exit BOOLEAN DEFAULT true,
    alert_on_enter BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_geofences_route_id ON geofences(route_id);
CREATE INDEX idx_geofences_type ON geofences(type);
```

### Location History Table
```sql
CREATE TABLE location_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    route_id UUID REFERENCES routes(id) ON DELETE SET NULL,
    coordinates POINT NOT NULL,
    accuracy FLOAT,
    speed FLOAT, -- km/h
    heading FLOAT, -- degrees
    altitude FLOAT,
    battery_level INTEGER,
    is_moving BOOLEAN DEFAULT false,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_location_user_id ON location_history(user_id);
CREATE INDEX idx_location_route_id ON location_history(route_id);
CREATE INDEX idx_location_timestamp ON location_history(timestamp);
CREATE INDEX idx_location_coordinates ON location_history USING GIST(coordinates);
CREATE INDEX idx_location_user_timestamp ON location_history(user_id, timestamp);
```

### Alerts Table
```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    route_id UUID REFERENCES routes(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('deviation', 'geofence_exit', 'geofence_enter', 'check_in_missed', 'emergency', 'speed', 'battery_low')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    message TEXT NOT NULL,
    channels JSONB NOT NULL DEFAULT '[]', -- ['push', 'sms', 'call', 'email']
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'cancelled')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_route_id ON alerts(route_id);
CREATE INDEX idx_alerts_type ON alerts(type);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_created_at ON alerts(created_at);
CREATE INDEX idx_alerts_user_status ON alerts(user_id, status);
```

### Emergency Contacts Table
```sql
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    relationship VARCHAR(50),
    priority INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_emergency_user_id ON emergency_contacts(user_id);
CREATE INDEX idx_emergency_priority ON emergency_contacts(user_id, priority);
```

### Check-ins Table
```sql
CREATE TABLE check_ins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    waypoint_id UUID REFERENCES waypoints(id) ON DELETE SET NULL,
    coordinates POINT NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'arrived' CHECK (status IN ('arrived', 'departed', 'delayed')),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_checkins_user_id ON check_ins(user_id);
CREATE INDEX idx_checkins_route_id ON check_ins(route_id);
CREATE INDEX idx_checkins_timestamp ON check_ins(timestamp);
```

## Redis Schema

### Session Management
```
Key: session:{user_id}
Value: {
  "token": "jwt_token",
  "refresh_token": "refresh_token",
  "expires_at": "2024-01-15T15:00:00Z",
  "device_info": {...}
}
TTL: 7 days
```

### Location Cache
```
Key: location:{user_id}
Value: {
  "coordinates": [55.7558, 37.6176],
  "timestamp": "2024-01-15T14:30:00Z",
  "speed": 15.5,
  "is_moving": true
}
TTL: 1 hour
```

### Active Routes
```
Key: active_route:{user_id}
Value: {
  "route_id": "route_789",
  "started_at": "2024-01-15T14:00:00Z",
  "current_waypoint": 1,
  "progress": 0.3
}
TTL: 24 hours
```

### Alert Rate Limiting
```
Key: alert_rate:{user_id}:{alert_type}
Value: count
TTL: 1 hour
```

## Data Models (TypeScript)

### User Model
```typescript
interface User {
  id: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: 'parent' | 'child' | 'admin';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    dateOfBirth?: Date;
  };
  settings: {
    notifications: {
      push: boolean;
      sms: boolean;
      email: boolean;
      call: boolean;
    };
    privacy: {
      locationSharing: 'real-time' | 'check-ins-only' | 'disabled';
      dataRetention: number; // days
      shareWithFamily: boolean;
    };
    language: string;
    timezone: string;
  };
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
```

### Route Model
```typescript
interface Route {
  id: string;
  name: string;
  description?: string;
  parentId: string;
  childId: string;
  isActive: boolean;
  settings: {
    alertOnDeviation: boolean;
    deviationThreshold: number; // meters
    checkInRequired: boolean;
    maxSpeed: number; // km/h
    batteryAlertThreshold: number; // percentage
  };
  createdAt: Date;
  updatedAt: Date;
  activatedAt?: Date;
  completedAt?: Date;
}
```

### Location Model
```typescript
interface Location {
  id: string;
  userId: string;
  routeId?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  accuracy: number;
  speed?: number;
  heading?: number;
  altitude?: number;
  batteryLevel?: number;
  isMoving: boolean;
  timestamp: Date;
  createdAt: Date;
}
```

### Alert Model
```typescript
interface Alert {
  id: string;
  userId: string;
  routeId?: string;
  type: 'deviation' | 'geofence_exit' | 'geofence_enter' | 'check_in_missed' | 'emergency' | 'speed' | 'battery_low';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  channels: ('push' | 'sms' | 'call' | 'email')[];
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'cancelled';
  metadata: Record<string, any>;
  createdAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  resolvedAt?: Date;
}
```

## Database Functions

### Calculate Distance
```sql
CREATE OR REPLACE FUNCTION calculate_distance(
    lat1 FLOAT, lon1 FLOAT,
    lat2 FLOAT, lon2 FLOAT
) RETURNS FLOAT AS $$
BEGIN
    RETURN 6371000 * acos(
        cos(radians(lat1)) * cos(radians(lat2)) * 
        cos(radians(lon2) - radians(lon1)) + 
        sin(radians(lat1)) * sin(radians(lat2))
    );
END;
$$ LANGUAGE plpgsql;
```

### Check Geofence
```sql
CREATE OR REPLACE FUNCTION check_geofence(
    point_lat FLOAT,
    point_lon FLOAT,
    geofence_coords JSONB
) RETURNS BOOLEAN AS $$
DECLARE
    geofence_type VARCHAR(20);
    center_lat FLOAT;
    center_lon FLOAT;
    radius FLOAT;
BEGIN
    geofence_type := geofence_coords->>'type';
    
    IF geofence_type = 'circle' THEN
        center_lat := (geofence_coords->'center'->>0)::FLOAT;
        center_lon := (geofence_coords->'center'->>1)::FLOAT;
        radius := (geofence_coords->>'radius')::FLOAT;
        
        RETURN calculate_distance(point_lat, point_lon, center_lat, center_lon) <= radius;
    END IF;
    
    -- For polygon, use PostGIS functions
    RETURN false; -- Simplified for this example
END;
$$ LANGUAGE plpgsql;
```

## Migration Scripts

### Initial Migration
```sql
-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create tables (see above)

-- Create functions (see above)

-- Insert default data
INSERT INTO users (id, email, password_hash, role, profile) VALUES 
('00000000-0000-0000-0000-000000000001', 'admin@guardianangel.app', '$2b$10$...', 'admin', '{"firstName": "Admin", "lastName": "System"}');
```

## Backup and Recovery

### Backup Strategy
- **Full backup**: Daily at 2 AM UTC
- **Incremental backup**: Every 6 hours
- **Point-in-time recovery**: 30 days retention
- **Cross-region replication**: For disaster recovery

### Data Retention
- **Location history**: 30 days (configurable)
- **Alerts**: 90 days
- **Inactive users**: 1 year before soft deletion
- **Audit logs**: 2 years

## Performance Optimization

### Indexing Strategy
- **Primary indexes**: On all foreign keys
- **Composite indexes**: For common query patterns
- **Partial indexes**: For filtered queries
- **GIN indexes**: For JSONB columns
- **GiST indexes**: For spatial data

### Query Optimization
- **Connection pooling**: PgBouncer
- **Read replicas**: For analytics queries
- **Query caching**: Redis for frequent queries
- **Partitioning**: By date for location_history table
