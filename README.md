# User Management App — Admin Dashboard

## About

A minimal, clean, and structured administration panel for managing users.
The project demonstrates authentication, access control, and basic CRUD operations using Supabase as the backend.

## Features

- [x] Registration & login
- [x] Supabase auth integration
- [x] Admin dashboard with user list
- [x] Pagination
- [x] User status management (active, blocked, unverified)
- [x] Blocking/unblocking users
- [x] Deleting individual users
- [x] Deleting unverified accounts
- [x] Automatic logout if the current user is blocked
- [x] Protection of admin panel through server-side access validation
- [x] Clean UI using Bootstrap
- [x] Clear separation of logic, UI components, hooks, utils and helpers

## Project Structure

```
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   ├── data/
│   ├── helpers/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── supabaseClient.js
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Stack

# Frontend
- **React 19** - library for building interactive user interfaces
- **React Router 7** - routing and navigation
- **Bootstrap 5** - responsive layout, UI components
- **Bootstrap Icons** - icon set used across the UI
- **Vite** -fast build tool and development server

# Backend
- **Node.js** - JavaScript runtime environment
- **Express 5** - backend HTTP server and REST API
- **CORS** - handling cross-origin HTTP requests
- **dotenv** - environment variables management

# Database & Auth
- **Supabase Auth** - user authentication and access control
- **Supabase Postgres** - relational database
- **Supabase JS SDK (v2)** - client and server access to Supabase APIs

# Email
- **Nodemailer** - transactional email delivery (verification)

# Tooling
- **ESLint** - code quality and consistency
- **concurrently** - run frontend and backend together in development

## Live Demo

https://usermanagmentfr.vercel.app/