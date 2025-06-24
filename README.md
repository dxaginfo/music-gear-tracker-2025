# Musician Gear Tracker

A comprehensive web application designed to help musicians, bands, and music professionals track, manage, and maintain their musical equipment. This application addresses critical pain points in the music industry, including gear loss prevention, maintenance scheduling, inventory management, and insurance documentation.

## 🎸 Features

### Core Features

- **Inventory Management** - Create detailed gear inventories with photos, categorization, and reporting capabilities
- **Gear Tracking** - Track the location of equipment, assign gear to band members, implement check-in/out functionality
- **Maintenance Scheduling** - Schedule maintenance tasks, track service history, set up reminders based on usage
- **Performance Integration** - Link gear to setlists and songs, create stage plots, share gear requirements
- **Insurance & Documentation** - Store receipts and warranty info, generate insurance reports, document gear condition

### Advanced Features

- **Mobile App Integration** - Scan and add gear on-the-go, receive real-time notifications
- **Data Analytics** - Analyze gear usage patterns, track most frequently used equipment
- **Community & Marketplace** - Showcase collections, get notifications about similar items for sale

## 🚀 Technology Stack

### Frontend
- React.js with Next.js for server-side rendering
- Redux Toolkit for state management
- Material-UI for responsive design components
- Mapbox GL for real-time gear positioning
- Chart.js for usage analytics and reporting

### Backend
- Node.js with Express.js
- RESTful API with GraphQL for complex data queries
- JWT with OAuth 2.0 for authentication
- Socket.io for real-time updates
- AWS S3 for file storage

### Database
- PostgreSQL for relational data management
- Redis for caching and job scheduling
- Elasticsearch for advanced inventory search

## 📋 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL
- Redis
- Docker (optional, for containerized development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/music-gear-tracker-2025.git
cd music-gear-tracker-2025
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables:
```bash
# In the server directory
cp .env.example .env
# Edit .env with your configuration

# In the client directory
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
# In the server directory
npm run db:migrate
npm run db:seed # Optional: seed the database with sample data
```

5. Start the development servers:
```bash
# In the server directory
npm run dev

# In the client directory (in a new terminal)
npm run dev
```

6. Access the application:
- Backend API: http://localhost:4000
- Frontend: http://localhost:3000

### Using Docker

1. Build and start containers:
```bash
docker-compose up -d
```

2. Access the application:
- Backend API: http://localhost:4000
- Frontend: http://localhost:3000

## 📁 Project Structure

```
music-gear-tracker-2025/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/              # Next.js pages
│   ├── public/             # Static assets
│   ├── styles/             # CSS/SCSS styles
│   └── utils/              # Utility functions
│
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
│
└── shared/                 # Shared code between client and server
    ├── constants/          # Shared constants
    ├── types/              # TypeScript type definitions
    └── utils/              # Shared utility functions
```

## 🧪 Testing

Run tests for the backend:
```bash
cd server
npm test
```

Run tests for the frontend:
```bash
cd client
npm test
```

## 🚢 Deployment

The application is designed to be deployed using Docker containers to AWS, Vercel, or other cloud platforms. Detailed deployment instructions are available in the [deployment guide](DEPLOYMENT.md).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Material-UI](https://mui.com/) for the UI components
- [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) for the frontend
- [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) for the backend
- [PostgreSQL](https://www.postgresql.org/) for the database
- [Redis](https://redis.io/) for caching and job scheduling
- [Elasticsearch](https://www.elastic.co/) for search functionality