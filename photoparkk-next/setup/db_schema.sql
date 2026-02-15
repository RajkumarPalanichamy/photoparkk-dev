-- Supabase Database Schema

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
  sizes jsonb not null, -- Stores array of objects {label, price, original}
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
  uploaded_image_url text, -- For custom uploads
  rating numeric default 5,
  thickness jsonb not null, -- Mixed type in schema, define as jsonb
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
  shape text, -- Matches structure roughly
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

-- Frame Customize (Orders/Selection) Table
-- This corresponds to the user's customized frame selection/order before final checkout
create table if not exists frame_customize (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  shape_data jsonb not null, -- Stores context of customization
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
  product_id uuid, -- Reference generic ID, product_type distinguishes table
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
  cart_item_id uuid, -- Optional link to cart item if needed for history
  product_type text not null,
  delivery_details jsonb, -- {name, email, phone, address, pincode}
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
  items jsonb, -- Array of items {title, frameImageUrl, etc}
  shipping_details jsonb, -- {fullName, phone, etc}
  status text default 'Pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS (Optional - recommended for production)
alter table users enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table frame_orders enable row level security;
-- (Add policies as needed for secure access)
