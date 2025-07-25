# Learn Solids 🎯

An interactive web application for learning geometric solids, built as a thesis project for the Secondary Technical School in Ústí nad Labem.

## 🌟 Features

- **3D Models**: Interactive 3D visualization of geometric solids using Spline
- **2D Representations**: Clear 2D diagrams for better understanding
- **Interactive Tasks**: Engaging quizzes to test your knowledge
- **Progress Tracking**: XP system to monitor your learning journey
- **User Leaderboard**: Compete with other learners
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Supabase (Database & Authentication)
- **3D Models**: Spline
- **Deployment**: Vercel/Netlify ready

## 🎮 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/FilipElznic/NaucSeTelesa.git
cd NaucSeTelesa
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server

```bash
npm run dev
```

## 📱 Routes

- `/` - Home page
- `/login` - Authentication
- `/solids` - Browse geometric solids
- `/tasks` - Practice with interactive tasks
- `/profile` - User profile and progress
- `/about` - Project information
- `/help` - Support and FAQ
- `/privacy-policy` - Privacy policy

## 🎯 Key Components

### Geometric Solids

Each solid includes:

- Interactive 3D model
- Mathematical formulas (volume, surface area)
- Detailed descriptions
- Visual representations

### Task System

- Multiple choice questions
- Immediate feedback
- XP rewards
- Progress tracking

### User Features

- Registration and authentication
- Profile customization
- Progress monitoring
- Leaderboard participation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── styles/        # Global styles
```

## 🎨 Features in Detail

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Filip Elznic**

- GitHub: [@FilipElznic](https://github.com/FilipElznic)
- Email: elznicfilip@gmail.com

## 🙏 Acknowledgments

- Secondary Technical School in Ústí nad Labem
- Spline for 3D modeling capabilities
- Supabase for backend infrastructure
- The React and TailwindCSS communities

---

_This project was created as a thesis work to demonstrate modern web development techniques while making geometry education more engaging and accessible._
