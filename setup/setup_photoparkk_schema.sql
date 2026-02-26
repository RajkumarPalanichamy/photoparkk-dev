-- 1. Create the schema
CREATE SCHEMA IF NOT EXISTS photoparkk;

-- 2. Grant usage on schema to api roles so Supabase can access it
GRANT USAGE ON SCHEMA photoparkk TO anon, authenticated, service_role;

-- 3. Enable UUID extension in public
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

-- 4. Create Tables within photoparkk schema

-- Users Table
CREATE TABLE IF NOT EXISTS photoparkk.users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  role text check (role in ('admin', 'customer')) default 'customer',
  password_hash text,
  reset_token text,
  reset_token_expire timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- New Arrivals Table
CREATE TABLE IF NOT EXISTS photoparkk.new_arrivals (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  image text,
  rating numeric default 5,
  thickness text not null,
  sizes jsonb not null,
  stock text,
  quantity integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Special Offers Table
CREATE TABLE IF NOT EXISTS photoparkk.special_offers (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  image text,
  rating numeric default 5,
  thickness text not null,
  sizes jsonb not null,
  stock text,
  quantity integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Acrylic Customize Table
CREATE TABLE IF NOT EXISTS photoparkk.acrylic_customize (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  image text,
  uploaded_image_url text, -- For custom uploads
  rating numeric default 5,
  thickness jsonb not null,
  sizes jsonb not null,
  stock text default 'In Stock',
  quantity integer default 1,
  shape text check (shape in ('Square', 'Portrait', 'Landscape', 'Love', 'Hexagon', 'Round')) not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Canvas Customize Table
CREATE TABLE IF NOT EXISTS photoparkk.canvas_customize (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  image text,
  uploaded_image_url text,
  rating numeric default 5,
  thickness text not null,
  sizes jsonb not null,
  stock text default 'In Stock',
  quantity integer default 1,
  shape text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Backlight Customize Table
CREATE TABLE IF NOT EXISTS photoparkk.backlight_customize (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  image text,
  uploaded_image_url text,
  rating numeric default 5,
  thickness jsonb not null,
  sizes jsonb not null,
  stock text default 'In Stock',
  quantity integer default 1,
  shape text check (shape in ('Square', 'Portrait', 'Landscape', 'Love', 'Hexagon', 'Round')) not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Frame Customize (Orders/Selection) Table
CREATE TABLE IF NOT EXISTS photoparkk.frame_customize (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references photoparkk.users(id),
  shape_data jsonb not null,
  selected_shape text not null,
  selected_color text not null,
  selected_frame_image text not null,
  selected_size text not null,
  quantity integer not null default 1,
  user_uploaded_image text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS photoparkk.cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references photoparkk.users(id) on delete cascade,
  product_id uuid,
  product_type text check (product_type in ('Newarrivaldata', 'SpecialOffersdata', 'AcrylicCustomizedata', 'Canvascustomizedata', 'Backlightcustomizedata')) not null,
  title text not null,
  quantity integer default 1,
  size text,
  thickness text,
  image text,
  uploaded_image_url text,
  price numeric not null,
  total_amount numeric not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS photoparkk.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references photoparkk.users(id),
  cart_item_id uuid,
  product_type text not null,
  delivery_details jsonb,
  image text,
  status text default 'Pending',
  amount numeric not null,
  payment_id text,
  payment_status text default 'pending',
  paid_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Frame Orders Table
CREATE TABLE IF NOT EXISTS photoparkk.frame_orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references photoparkk.users(id),
  items jsonb,
  shipping_details jsonb,
  status text default 'Pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Customizer Templates
CREATE TABLE IF NOT EXISTS photoparkk.customizer_templates (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image text,
  price numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 5. Grant access to all tables in the schema
GRANT ALL ON ALL TABLES IN SCHEMA photoparkk TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA photoparkk TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA photoparkk TO anon, authenticated, service_role;

-- 6. Enable RLS
ALTER TABLE photoparkk.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.frame_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.customizer_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.new_arrivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.special_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.acrylic_customize ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.canvas_customize ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.backlight_customize ENABLE ROW LEVEL SECURITY;
ALTER TABLE photoparkk.frame_customize ENABLE ROW LEVEL SECURITY;

-- 7. Public Read Policies (for products)
CREATE POLICY "Public Read Access" ON photoparkk.new_arrivals FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON photoparkk.special_offers FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON photoparkk.acrylic_customize FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON photoparkk.canvas_customize FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON photoparkk.backlight_customize FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON photoparkk.customizer_templates FOR SELECT USING (true);

-- 8. Permissive Policies for Dev Environment
-- Remove or restrict these before moving to production
CREATE POLICY "Admin All Access" ON photoparkk.customizer_templates FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.users FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.cart_items FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.orders FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.frame_orders FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.frame_customize FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.new_arrivals FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.special_offers FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.acrylic_customize FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.canvas_customize FOR ALL USING (true);
CREATE POLICY "Public All Access" ON photoparkk.backlight_customize FOR ALL USING (true);
