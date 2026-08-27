# Baran Shop

A modern and responsive women's fashion e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.

## Live Demo

https://baran-shop.netlify.app

## About The Project

Baran Shop is a full-stack e-commerce application designed for women's fashion products.

The project focuses on creating a realistic online shopping experience with a modern user interface, responsive design, authentication system, product management, shopping cart functionality, and order processing.

The main goal of this project was to build a production-oriented e-commerce application using modern web technologies and best practices.

## Features

### Shopping Experience

- Browse products and categories
- Product detail pages
- Product search functionality
- Product variants including size and color selection
- Shopping cart management
- Quantity management in cart
- Order creation
- Simulated payment process

### User Authentication

- User registration
- User login
- JWT-based authentication
- Cookie-based session management
- User profile
- Order history

### UI and User Experience

- Fully responsive design
- Desktop and mobile layouts
- Mobile bottom navigation
- Modern fashion-oriented UI
- Smooth animations
- Carousel-based banners and product sections
- Persian font support using Iran Yekan

## Screenshots

### Desktop View

![Desktop View](./screenshots/home-desktop.webp)

### Mobile View

![Mobile View](./screenshots/home-mobile.webp)

### Product Details

![Product Details](./screenshots/product-details.webp)

### Shopping Cart

![Shopping Cart](./screenshots/cart.webp)

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand
- Framer Motion
- Embla Carousel
- Lucide React
- React Icons

### Backend and Database

- Next.js API Routes
- MySQL
- TiDB Cloud
- mysql2
- JWT Authentication
- bcryptjs
- Cookies

### Development Tools

- TypeScript
- ESLint
- TSX
- Git
- GitHub

## Architecture

The project follows a modern full-stack architecture:

- Frontend: Next.js App Router
- API Layer: Next.js Route Handlers
- Database: TiDB Cloud (MySQL Compatible)
- Authentication: JWT with HTTP Cookies

## Database Structure

The application uses a MySQL-compatible database hosted on TiDB Cloud.

Main database tables:

- users
- products
- products_images
- categories
- orders
- order_items

## Installation

Clone the repository:

```bash
git clone https://github.com/fatemmmehhosseini/baran-shop.git
```

Navigate to the project directory:

```bash
cd baran-shop
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the root directory and add the required environment variables:

```env
DB_HOST=your_database_host

DB_PORT=4000

DB_USER=your_database_user

DB_PASSWORD=your_database_password

DB_NAME=test

JWT_SECRET=your_secret_key
```

## Running the Project

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Production Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Project Structure

```text
baran-shop
│
├── app
│   ├── (auth)
│   ├── about
│   ├── api
│   ├── cart
│   ├── checkout
│   ├── contact
│   ├── fonts
│   ├── payment
│   ├── products
│   ├── profile
│   │
│   ├── error.tsx
│   ├── fonts.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components
│
├── services
│
├── stores
│
├── types
│
├── public
│
├── screenshots
│
├── certs
│
├── package.json
│
└── README.md
```

## Payment

The payment flow in this project is simulated for demonstration purposes.

No real payment gateway has been integrated.

## Deployment

The project is configured for deployment on Netlify.

Environment variables must be configured in the deployment platform before running the application in production.

## Developer

Developed by:

Fatemeh Hosseini

GitHub:

https://github.com/fatemmmehhosseini/baran-shop

## License

This project is created for portfolio and educational purposes.