
# Supabase Database Setup for Photo Parkk

To get your application fully functional, please follow these steps to set up your Supabase database.

### 1. Run the Database Schema
Open your [Supabase Dashboard](https://supabase.com/dashboard), go to the **SQL Editor**, and run the following script. This will create all the necessary tables (Users, Products, Cart, Orders) and enable the UUID extension.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table if not exists users (
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
create table if not exists new_arrivals (
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
create table if not exists special_offers (
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
create table if not exists acrylic_customize (
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

-- Canvas Customize Table
create table if not exists canvas_customize (
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
create table if not exists backlight_customize (
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

-- Frame Customize (Selection) Table
create table if not exists frame_customize (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
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
create table if not exists cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
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
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
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
create table if not exists frame_orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  items jsonb,
  shipping_details jsonb,
  status text default 'Pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Customizer Templates (WhatsApp Order Templates)
create table if not exists customizer_templates (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image text,
  price numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### 2. Configure Access Control (RLS)
By default, Supabase blocks all access to tables. For the website to display products to visitors, run these commands in the SQL Editor:

```sql
-- Allow everyone to view products
alter table new_arrivals enable row level security;
create policy "Public Read Access" on new_arrivals for select using (true);

alter table special_offers enable row level security;
create policy "Public Read Access" on special_offers for select using (true);

alter table acrylic_customize enable row level security;
create policy "Public Read Access" on acrylic_customize for select using (true);

alter table customizer_templates enable row level security;
create policy "Public Read Access" on customizer_templates for select using (true);
create policy "Admin All Access" on customizer_templates for all using (true);

-- Allow users to manage their own cart (Simplified for development)
alter table cart_items enable row level security;
create policy "Allow individual management" on cart_items for all using (true);
```

### 3. Seed Initial Data
You can now run the following command in your terminal to populate the database with initial products and a default admin user:

```bash
node src/scripts/seed.js
```
**Admin Credentials (after seeding):**
- **Email:** admin@photoparkk.com
- **Password:** adminpassword123

(Wait, I'll make sure the `seed.js` script works correctly once the tables are created.)
