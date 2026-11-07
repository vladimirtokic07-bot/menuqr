# MenuQR - Database Schema (Supabase)

## Tables

### 1. `businesses`
- `id` (uuid, primary key)
- `name` (text, e.g., "Olive & Salt")
- `slug` (text, unique, e.g., "olive-salt")
- `created_at` (timestamp)

### 2. `categories`
- `id` (uuid, primary key)
- `business_id` (uuid, foreign key -> businesses.id)
- `name` (text, e.g., "Appetizers")
- `display_order` (int)

### 3. `menu_items`
- `id` (uuid, primary key)
- `business_id` (uuid, foreign key -> businesses.id)
- `category_id` (uuid, foreign key -> categories.id)
- `name` (text, e.g., "Whipped Ricotta")
- `description` (text)
- `price_cents` (int, e.g., 1200 for $12.00)
- `is_active` (boolean, default true)
- `is_vegetarian` (boolean, default false)
- `is_spicy` (boolean, default false)
- `is_chef_choice` (boolean, default false)
- `allergens` (text array, e.g., ['Sesame', 'Dairy'])
- `calories` (int, nullable)
- `image_url` (text, nullable)

### 4. `menu_scans` (Analytics)
- `id` (uuid, primary key)
- `business_id` (uuid, foreign key -> businesses.id)
- `scanned_at` (timestamp, default now())
- `ip_hash` (text, anonymized)