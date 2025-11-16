# ChefPoint - Restaurant Management Platform

**Language / Dil:** [English](README.md) | [Türkçe](README_TR.md)

---

A comprehensive digital solution suite for restaurants, consisting of multiple integrated web applications that provide a complete restaurant management ecosystem.

## Overview

This platform unifies four core applications under one seamless experience:

1. **Chef Point Dashboard** - Main hub for accessing all applications
2. **Customer App** - Customer-facing application for restaurant discovery, reservations, and orders
3. **QR Application** - Advanced QR Menu for instant table-side menu access, ordering, and payment
4. **Restaurant OS** - Dashboard for order management, menu editing, and analytics

## Repository Structure

```
ChefPoint/
├── chef-point/           # Main dashboard hub
├── customer-app/         # Customer-facing application
├── restaurant-dashboard/ # Restaurant management dashboard
├── advanced-qr-menu/     # QR Menu application
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
├── deploy.sh            # Manual deployment script
└── package.json         # Root package.json with deploy scripts
```

## Applications

### Chef Point Dashboard

Main hub application that provides centralized access to all other applications.

**Live URL:** `https://[username].github.io/ChefPoint/`

**Features:**
- Centralized access to all applications
- Modern and intuitive interface
- Multi-language support (TR/EN)

**Port:** 3000 (Development)

### Customer App

Customer-facing application designed for restaurant discovery, reservations, and takeaway orders.

**Live URL:** `https://[username].github.io/ChefPoint/customer-app/`

**Features:**
- Restaurant Discovery with advanced filtering and search
- Reservation System
- Short Videos (restaurant content similar to YouTube Shorts)
- Takeaway Order System
- User Profile and Order History
- Loyalty Program Tracking
- Favorite Restaurants

**Port:** 5174 (Development)

### QR Application

Advanced QR Menu system that allows customers to access menus, place orders, and make payments directly from their tables.

**Live URL:** `https://[username].github.io/ChefPoint/advanced_qr_menu/`

**Features:**
- QR Menu (Advanced)
- Instant Order Placement
- Integrated Payment System
- Review and Rating System
- Multi-language Support (TR/EN)

**Port:** 5177 (Development)

### Restaurant OS

Comprehensive dashboard for restaurant owners to manage all aspects of their operations.

**Live URL:** `https://[username].github.io/ChefPoint/restaurant-dashboard/`

**Features:**
- Dashboard and Analytics
- Order Management
- Menu Editing
- Campaign Management
- Table Management
- Staff Management
- Settings and Configuration

**Port:** 5173 (Development)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

Install dependencies for all applications:

```bash
npm run install:all
```

Or install individually:

```bash
# Customer App
cd customer-app && npm install && cd ..

# Restaurant Dashboard
cd restaurant-dashboard && npm install && cd ..

# Advanced QR Menu
cd advanced-qr-menu && npm install && cd ..

# Chef Point Dashboard
cd chef-point && npm install && cd ..
```

### Development

Run each application individually:

```bash
# Chef Point Dashboard (Main Hub)
cd chef-point
npm run dev
# Opens at http://localhost:3000

# Customer App
cd customer-app
npm run dev
# Opens at http://localhost:5174

# Restaurant Dashboard
cd restaurant-dashboard
npm run dev
# Opens at http://localhost:5173

# Advanced QR Menu
cd advanced-qr-menu
npm run dev
# Opens at http://localhost:5177
```

## Deployment

### Automatic Deployment (GitHub Actions)

This repository is configured for automatic deployment to GitHub Pages:

1. Push to `main` or `master` branch
2. GitHub Actions automatically builds all applications
3. Deploys to GitHub Pages

**First-time setup:**
- Go to Repository Settings → Pages
- Set Source to: **GitHub Actions**

### Manual Deployment

```bash
# Build all applications and deploy
npm run deploy
```

Or step by step:

```bash
# Build all applications
./deploy.sh

# Deploy to GitHub Pages
gh-pages -d deploy-dist
```

## Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **State Management:** Zustand (in some applications)
- **Charts:** Recharts (in dashboard)

## Project Structure

Each application is independent and can be developed separately:

- `chef-point/` - Main dashboard hub
- `customer-app/` - Customer-facing application
- `restaurant-dashboard/` - Restaurant management dashboard
- `advanced-qr-menu/` - QR Menu application

## GitHub Pages URLs

After deployment, applications will be available at:

- **Main Dashboard:** `https://[username].github.io/ChefPoint/`
- **Customer App:** `https://[username].github.io/ChefPoint/customer-app/`
- **Restaurant Dashboard:** `https://[username].github.io/ChefPoint/restaurant-dashboard/`
- **QR Application:** `https://[username].github.io/ChefPoint/advanced_qr_menu/`

## Features

- Modern and user-friendly interface
- Mobile-first responsive design
- Professional visual design
- Fast and smooth performance
- Real-time updates (simulated)
- Integrated payment system (demo)
- Detailed reporting and analytics
- Multi-language support

## Demo Data

All applications include comprehensive mock data:
- Multiple restaurant types (Italian, Japanese, Turkish)
- Menu items with detailed information
- Reviews and ratings
- Campaigns and promotions
- Loyalty programs
- Short video content

## Notes

This is a frontend demonstration project. For production use, the following components need to be added:
- Backend API integration
- Database implementation
- Real payment gateway integration
- Authentication and authorization
- Real-time communication (WebSockets)
- File upload and storage
- Email and notification services

## License

This project is licensed under a custom proprietary license. Unauthorized use, distribution, modification, hosting, or commercial use is prohibited without prior written permission from the author.

See the `LICENSE` file for full terms.

## Support

For questions or issues, please refer to the individual application README files or create an issue in the repository.
