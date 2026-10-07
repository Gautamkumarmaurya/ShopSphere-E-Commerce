# ShopSphere

ShopSphere is a responsive e-commerce storefront demo built with React. It lets visitors discover products, search and filter the catalogue, view product details, manage a shopping cart, and try a simulated checkout flow.

The project focuses on the customer-facing shopping experience. It uses the public [DummyJSON Products API](https://dummyjson.com/docs/products) for catalogue data and browser storage for demo cart and account state. It does not include a production backend, real authentication, or payment processing.

## What you can do

- Browse a home page with featured products and links to product categories.
- Explore the shop and search products by name.
- Filter products by category, maximum discounted price, and minimum rating.
- Sort the catalogue by price, rating, and newest products.
- Open a product page to see product information and related products.
- Add products to the cart, change quantities, remove items, and review the order total.
- Try the demo login and signup screens.
- Walk through a front-end checkout demonstration.
- Use the responsive navigation and layouts on mobile, tablet, and desktop.

## Technology

- **React 18** for the user interface
- **Vite** for local development and production builds
- **React Router** for page navigation
- **Tailwind CSS 4** for styling
- **Lucide React** for interface icons
- **DummyJSON** for sample product data
- **Browser localStorage** for demo cart and account persistence

## Getting started

### Requirements

- Node.js and npm
- An internet connection to load product data from DummyJSON and remote product images

### Install and run

Open a terminal in the project folder and run:

```bash
cd shopsphere
npm install
npm run dev
```

Vite prints a local URL in the terminal, usually `http://localhost:5173/`. Open that URL in your browser. If the default port is already being used, Vite will select another available port unless strict port mode is enabled.

### Production build

Create an optimized production build:

```bash
npm run build
```

To serve and inspect that build locally:

```bash
npm run preview
```

## How the app works

1. **The app starts in `src/main.jsx`.** It mounts the React app and wraps it in the router, authentication context, and cart context.
2. **`src/App.jsx` maps URLs to pages.** Shared navigation and footer surround the routes; the login page has a focused layout without the main navigation.
3. **Product pages request data from DummyJSON.** The product API helpers in `src/services/productApi.js` load product lists, categories, search results, or an individual product. Pages show loading and error states while requests run.
4. **Shop controls update the visible catalogue.** Search and category selection request the matching products. Price, rating, and sort controls filter or order the fetched results in the browser.
5. **The cart is shared across pages.** `CartContext` manages quantities and totals and saves the cart in localStorage, so it remains available after a page reload in the same browser.
6. **Account and checkout flows are demonstrations.** The account context stores a demo user locally. Checkout is a front-end simulation and does not create a real order or charge a payment method.

## Main routes

| URL | Page |
| --- | --- |
| `/` | Home page and featured product collection |
| `/shop` | Product catalogue, search, filters, and sorting |
| `/products/:id` | Product details and related products |
| `/cart` | Cart contents and quantity controls |
| `/checkout` | Demo checkout flow |
| `/login` | Demo login |
| `/signup` | Demo account creation |

The shop also accepts query parameters such as `/shop?category=smartphones` and `/shop?search=phone`.

## Project structure

```text
src/
  components/   Shared interface elements, product cards, and filters
  context/      Shared cart and demo account state
  data/         Static category and display data
  hooks/        Reusable React hooks
  pages/        Home, shop, product, cart, account, and checkout pages
  services/     DummyJSON product API requests
  utils/        Formatting and browser-storage helpers
  App.jsx       Routes and shared page layout
  main.jsx      React application entry point
  index.css     Tailwind import and global/component styles
```

## Important notes

- Product data is supplied by DummyJSON, not by a ShopSphere database. Product availability and API uptime depend on that external service.
- Login and signup are simulated in the browser. They do not verify credentials or create secure accounts.
- Checkout is for demonstration only. No order is submitted and no real payment information should be entered.
- Cart and demo account information are stored in the current browser's localStorage. Clearing browser storage removes that information.
- Wishlist controls are currently illustrative UI and are not connected to persistent wishlist functionality.
- Do not use this demo to collect real customer, account, or payment data.

## Available npm commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
