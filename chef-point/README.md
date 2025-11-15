# Chef Point - Restaurant Management Platform Dashboard

Chef Point is a comprehensive digital platform hub application designed for restaurant management. This application serves as a central dashboard that unifies three different modules under one seamless experience.

## Overview

Chef Point provides a single entry point to access and manage all restaurant-related applications:

1. **Foodie App (Customer App)** - Customer-facing application for restaurant discovery, reservations, and orders
2. **QR Application** - Advanced QR Menu for instant table-side menu access, ordering, and payment
3. **Restaurant OS** - Dashboard for order management, menu editing, and analytics

## Features

### Centralized Access

- Single dashboard to access all restaurant applications
- Unified design language across all modules
- Seamless navigation between applications
- Modern and intuitive user interface

### Application Modules

#### Foodie App
- Restaurant discovery and search
- Reservation system
- Short videos (restaurant content)
- Takeaway ordering

#### QR Application
- QR code menu access
- Instant order placement
- Payment processing
- Review and rating system

#### Restaurant OS
- Dashboard and analytics
- Order management
- Menu editing
- Campaign management

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Running Other Applications

To access the full functionality, you need to run the other applications as well:

```bash
# Customer App (Foodie App)
cd ../customer-app
npm run dev

# QR Application
cd ../advanced-qr-menu
npm run dev

# Restaurant Dashboard
cd ../restaurant-dashboard
npm run dev
```

Each application runs on its designated port:
- Customer App: http://localhost:5173
- QR Application: http://localhost:5177
- Restaurant Dashboard: http://localhost:5175

## Technology Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Development Server

The development server runs on port 3000 by default. The application will automatically open in your browser when you start the dev server.

## Deployment

### GitHub Pages

This application is configured for GitHub Pages deployment. To deploy:

1. Build the application:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

The application will be deployed to the `gh-pages` branch and will be accessible at:
`https://[username].github.io/chef-point/`

### Configuration

The base path for GitHub Pages is configured in `vite.config.ts`. If your repository name is different, update the base path accordingly:

```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

### Environment Detection

The application automatically detects whether it's running in production (GitHub Pages) or development (localhost) and adjusts the application links accordingly:

- **Development:** Links point to localhost with specific ports
- **Production:** Links point to GitHub Pages URLs for each application

## Project Structure

```
chef-point/
├── src/
│   ├── pages/
│   │   └── Home.tsx          # Main dashboard page
│   ├── contexts/
│   │   └── LanguageContext.tsx # Language switching context
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
├── public/                   # Static assets
├── package.json
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## Design

The application features a modern, minimalist, and user-friendly interface design. Each module has its own gradient color scheme and smooth animations for an enhanced user experience.

### Design Principles

- Clean and modern interface
- Consistent design language
- Smooth transitions and animations
- Responsive design for all screen sizes
- Accessible color contrasts

## Language Support

The application supports multiple languages:
- English (default)
- Turkish

Language switching is available through the header language selector.

## Notes

- This application serves as a hub for other restaurant management applications
- Each application runs independently on its own port
- The dashboard provides centralized access to all modules
- In production (GitHub Pages), all applications should be deployed separately and linked from this dashboard

## Contributing

When contributing to this project:

1. Follow the existing code style
2. Use TypeScript for type safety
3. Ensure responsive design compatibility
4. Test on multiple browsers
5. Update documentation as needed

## License

This project is a demonstration application.

## Support

For questions or issues, please refer to the main project README or create an issue in the repository.
