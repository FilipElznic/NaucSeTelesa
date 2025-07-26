# NaucSeTelesa (Learn Solids) 🔮

A modern interactive web application for learning geometric solids with 3D visualizations, built with React and Supabase.

![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-green.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-blue.svg)
![Supabase](https://img.shields.io/badge/Supabase-2.46.1-green.svg)

## � Project Overview

NaucSeTelesa is an educational platform designed to help students learn about geometric solids through:

- **Interactive 3D Models**: Powered by Spline for immersive visualization
- **Mathematical Formulas**: Rendered with KaTeX for precise mathematical notation
- **Practice Tasks**: Interactive exercises to test knowledge
- **Progress Tracking**: User accounts with XP system and leaderboards
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Features

### 📚 Educational Content

- **Geometric Solids Library**: Comprehensive collection of 2D shapes and 3D solids
- **Interactive 3D Models**: Rotate, zoom, and explore geometric shapes
- **Formula Integration**: Mathematical formulas for volume, surface area, and perimeter
- **Multilingual Support**: Available in English version

### 👤 User Experience

- **User Authentication**: Sign up with email
- **Progress Tracking**: XP system with levels and achievements
- **Leaderboards**: Compare progress with other users
- **Personal Dashboard**: Track learning progress and statistics

### 🎮 Interactive Learning

- **Practice Tasks**: Multiple choice questions about geometric properties
- **Instant Feedback**: Real-time validation and explanations
- **Adaptive Difficulty**: Tasks adjust based on user performance

## �️ Tech Stack

### Frontend

- **React 18.3.1** - Modern UI library
- **Vite 6.3.5** - Fast build tool and dev server
- **TailwindCSS 3.4.15** - Utility-first CSS framework
- **React Router 7.0.2** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend & Database

- **Supabase** - Backend as a Service (BaaS)
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Data protection

### 3D & Math Rendering

- **Spline** - 3D model integration
- **KaTeX** - Mathematical formula rendering
- **React KaTeX** - React wrapper for KaTeX

### Additional Libraries

- **React Toastify** - Toast notifications
- **EmailJS** - Contact form functionality
- **UUID** - Unique identifier generation

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Supabase account** (free tier available)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/FilipElznic/NaucSeTelesa.git
cd NaucSeTelesa
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_public_key
```

## 🗃️ Supabase Configuration

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up/in and create a new project
3. Wait for the project to be set up (usually 1-2 minutes)

### Step 2: Get Project Credentials

1. Go to Project Settings → API
2. Copy your:
   - **Project URL** (VITE_SUPABASE_URL)
   - **Anon public key** (VITE_SUPABASE_KEY)

### Step 3: Create database same in the Docs.jsx

1. Go to public folder and find database.png
2. Create database same as in the picture
3. You will also need to setup RLS policies

(you can't export supabase database with RLS policies and data)
The data needed for insert will be in folder data in src

### Step 4: Authentication Setup

1. Go to Authentication → Settings
2. Configure sign-in providers:
   - **Email**: Enable email authentication
3. Set up email templates if needed

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## � Project Structure

```
NaucSeTelesa/
├── public/                 # Static assets
│   ├── cube.webp
│   ├── robots.txt
│   └── ...
├── src/
│   ├── Components/         # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Features.jsx
│   │   ├── TaskLayout.jsx
│   │   ├── Telesa.jsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── aboutPage.jsx
│   │   ├── loginPage.jsx
│   │   ├── taskPage.jsx
│   │   └── ...
│   ├── assets/             # Images and static files
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Application entry point
│   ├── AuthContext.jsx     # Authentication context
│   ├── ProtectedRoute.jsx  # Route protection component
│   ├── supabaseClient.js   # Supabase configuration
│   └── Global.jsx          # Global state management
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md              # Project documentation
```

## �📱 Routes

- `/` - Home page with project overview
- `/login` - Authentication
- `/solids` - Browse geometric solids
- `/tasks` - Practice with interactive tasks
- `/profile` - User profile and progress
- `/about` - Project information
- `/help` - Support and FAQ
- `/privacy-policy` - Privacy policy

## 🎯 Key Features in Detail

### 🎮 Interactive Learning

- **3D Visualization**: Spline-powered 3D models for each geometric solid
- **Mathematical Formulas**: KaTeX rendering for precise mathematical notation
- **Practice Tasks**: Multiple-choice questions with instant feedback
- **Progress Tracking**: XP system with levels and achievements

### 👥 User Management

- **Email Authentication**: Secure email-based user registration and login
- **User Profiles**: Customizable profiles with progress tracking
- **Leaderboards**: Global ranking system
- **Data Persistence**: All progress saved in Supabase

### 📊 Analytics & Progress

- **Task Completion Tracking**: Monitor which tasks users complete
- **XP and Leveling System**: Gamified learning experience
- **Statistics Dashboard**: Detailed progress analytics
- **Achievement System**: Rewards for milestones

## 🔒 Environment Variables

Required environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-public-key
```

### Common Issues

1. **Supabase Connection Error**

   - Verify your `.env` file contains correct Supabase credentials
   - Check if your Supabase project is active

2. **3D Models Not Loading**

   - Ensure stable internet connection
   - Check Spline URLs in database

3. **Authentication Issues**

   - Verify OAuth provider configurations in Supabase
   - Check redirect URLs

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for missing environment variables

## 🎓 Educational Context

This project demonstrates:

- Modern React development patterns
- Database design and management
- User authentication and authorization
- 3D graphics integration
- Mathematical content rendering
- Responsive web design
- Educational technology principles

Perfect for students learning web development, database management, or educational technology!

## 📝 License

This project is created as a thesis work for educational purposes.

---

**Made with ❤️ for geometry education**

### 3D Visualization

- Powered by Spline for smooth 3D interactions
- Responsive 3D models that work on all devices
- Interactive rotation and zoom capabilities

### Learning System

- Structured learning path
- Adaptive difficulty
- Comprehensive progress tracking

### User Experience

- Modern, clean interface
- Smooth animations and transitions
- Accessibility-focused design

## 👨‍💻 Author

**Filip Elznic**

- GitHub: [@FilipElznic](https://github.com/FilipElznic)
- Email: elznicfilip@gmail.com

<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>
