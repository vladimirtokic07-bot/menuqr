# MenuQR - Product Requirements Document

## Vision
A fast, reliable, and beautiful QR-code digital menu SaaS for cafes and restaurants globally. It replaces printed menus, allowing instant price updates and providing basic guest analytics.

## Target Audience
Independent cafe and restaurant owners who want to modernize their guest experience without technical complexity.

## Core Features (MVP)
1. **Landing Page**: Marketing site explaining the value proposition, features, and pricing.
2. **Guest Menu (`/m/[slug]`)**: Mobile-first, dynamic menu viewed by guests after scanning a QR code. Includes categories, item details (allergens, calories), and a "Call waiter" button.
3. **Owner Dashboard (`/dashboard`)**: Protected route where owners can manage menu items (CRUD), view basic analytics (scans, views), and download their unique QR code.
4. **Authentication**: Secure login for restaurant owners (via Supabase Auth).
5. **Database**: Supabase PostgreSQL to store businesses, menu items, categories, and scan analytics.