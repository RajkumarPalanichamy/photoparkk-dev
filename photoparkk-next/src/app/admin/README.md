
# Admin Panel Documentation

## Overview
The Admin Panel allows store administrators to manage the application, including:
- **Dashboard**: View key metrics (Orders, Revenue, Products, Frame Counts).
- **Orders**: Manage customer orders (Standard and Custom Frames).
- **Products**: Manage catalog (New Arrivals, Special Offers).
- **Frames**: Manage frame product types (Acrylic, Canvas, Backlight).

## Structure
- `/admin`: Main dashboard with statistics.
- `/admin/orders`: Order management.
  - Tab: Product Orders (lists standard checkout orders).
  - Tab: Frame Orders (lists custom frame requests).
- `/admin/products`: Product catalog management.
  - Tabs: New Arrivals, Special Offers, Acrylic, Canvas, Backlight.
  - Supports Create, Read, Update, Delete (CRUD).
- `/admin/frames`: Hub for frame management shortcuts.

## API Routes
The admin panel interacts with the following backend API routes:
- `/api/admin/stats`: Fetch dashboard metrics.
- `/api/orders`: List and filter orders.
- `/api/orders/[id]`: Manage single order.
- `/api/frameorders`: List and filter frame orders.
- `/api/newarrivals`: Manage 'New Arrival' products.
- `/api/specialoffers`: Manage 'Special Offer' products.
- `/api/frames/[type]`: Manage specific frame product types (acrylic, canvas, backlight).

## Key Components
- `src/components/admin/ProductManager.jsx`: Reusable component for product tables and forms.
- `src/components/admin/CommonOrderList.jsx`: Component for standard order listing.
- `src/components/admin/FrameOrderList.jsx`: Component for frame order listing.

## Notes
- **Authentication**: Ensure routes are protected. Currently, client-side checks exist in `layout.js`.
- **Image Uploads**: Product forms accept Image URLs. Ensure images are hosted (e.g., Cloudinary) and paste the URL.
- **Sizes & Prices**:
  - For standard products, use JSON format: `[{"label": "12x12", "price": 999}]`.
  - For frames, verify specific requirements (some use base price, some use size logic).
