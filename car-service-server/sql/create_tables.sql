-- Create tables

CREATE TABLE public.appointments (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    mechanic_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    appointment_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    appointment_type VARCHAR(255) NOT NULL,
    appointment_status VARCHAR(255) DEFAULT 'Pending',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.cars (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    year INTEGER NOT NULL,
    color VARCHAR(255),
    plate VARCHAR(20) UNIQUE NOT NULL,
    issues JSONB,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- Role can be 'customer', 'mechanic', or 'admin'
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    car_id INTEGER REFERENCES public.cars(id),
    appointments JSONB,
    location JSONB, -- Location data for mechanics
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add some mock data

INSERT INTO public.appointments (customer_id, mechanic_id, car_id, appointment_date, appointment_type) VALUES
    (1, 2, 1, '2024-02-10 09:00:00', 'Oil Change'),
    (2, 3, 2, '2024-02-15 10:30:00', 'Brake Service'),
    (3, 2, 3, '2024-02-20 13:00:00', 'Tire Rotation');

INSERT INTO public.cars (model, brand, type, year, color, plate, issues) VALUES
    ('CLA200', 'Mercedes', 'Sedan', 2018, 'Black', 'ABC123', '["Engine problem", "Color issue"]'),
    ('Egea', 'Fiat', 'Cross', 2020, 'Orange', 'DEF456', '["Brake problem", "Alignment issue"]'),
    ('Corolla', 'Toyota', 'Sedan', 2019, 'Black', 'GHI789', '["Tire issue", "AC problem", "Engine Prob"]'),
    ('A8', 'Audi', 'Sedan', 2017, 'White', 'JKL101', '["Engine problem", "Color issue"]'),
    ('Passat', 'Volkswagen', 'Sedan', 2016, 'Black', 'MNO112', '["Brake problem", "Alignment issue"]'),
    ('Polo', 'Volkswagen', 'Hatchback', 2015, 'Red', 'PQR113', '["Tire issue", "AC problem"]'),
    ('Doblo', 'Fiat', 'Panelvan', 2015, 'Grey', 'PQR114', '["Tire issue", "AC problem","Alignment issue"]'),
    ('Symbol', 'Renault', 'Sedan', 2015, 'White', 'PQR115', '["Tire issue", "AC problem", "Engine"]');

INSERT INTO public.users (username, email, password, role, first_name, last_name, car_id, appointments, location) VALUES
    ('customer1', 'customer1@example.com', '$2a$14$wVsaPvJnJJsomWArouWCtusem6S/.Gauq/GjOIEHpyh2DAMmso1wy', 'customer', 'Customer', 'Doe', 1, '[{"id": 1, "mechanic_id": 2, "car_id": 1, "appointment_date": "2024-02-10T09:00:00", "appointment_type": "Oil Change"}]', NULL),
    ('mechanic1', 'mechanic1@example.com', '$2a$14$wVsaPvJnJJsomWArouWCtusem6S/.Gauq/GjOIEHpyh2DAMmso1wy', 'mechanic', 'Mechanic', 'Doe', 2, '[{"id": 1, "customer_id": 1, "car_id": 1, "appointment_date": "2024-02-10T09:00:00", "appointment_type": "Oil Change"}]', '{"name": "Avcılar Oto Tamir", "latitude": 41.012311, "longitude": 28.699072, "latitudeDelta": 0.5, "longitudeDelta": 0.5}'),
('admin', 'admin@example.com', '$2a$14$wVsaPvJnJJsomWArouWCtusem6S/.Gauq/GjOIEHpyh2DAMmso1wy', 'admin', 'Admin', 'Admin', NULL, NULL, NULL);
