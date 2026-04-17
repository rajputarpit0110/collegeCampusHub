# College Clubs Web Application

A centralized college clubs management platform built with **React**, **TailwindCSS**, and **React Router** - no backend required!

## 🎯 Features

### Authentication
- **Login System**: Users must authenticate with email and password from the JSON data file
- **Credentials System**: Supports both Student and Admin roles
- **Session Management**: Persistent user session throughout the app

### Dashboard (Landing Page)
- Beautiful, responsive hero section
- **Important Notices Section**:
  - Shows clubs with ongoing recruitment
  - Displays upcoming events in real-time
  - Interactive notice cards
- Quick access to all clubs

### Club Sections
- **🖥️ Technical Clubs** (9 clubs):
  - CREATIVE CELL, E-CELL, Google Developer Groups, INNOGEEKS, Kinesis, MLSA, Saekiet, Technocrats, DSDL
  
- **🎭 Cultural Clubs** (8 clubs):
  - Kiet Music Club, TEDxKIET, Pragmatic Fashion Society, kiet movie society, EK PRAYASS, THE IMPECCABLES, Kavyanjali, Spark Creations

### Club Management
- **Club Cards**: Show club name, description, member count, events, and recruitment status
- **Club Details Page**: Comprehensive view with full description, events, and contact info
- **Admin Controls**: Admins can open/close recruitment status for clubs

### User Registration
- Simple 3-field registration form (Name, Email, Branch)
- Form validation
- Success message on submission
- Automatic redirect to dashboard after registration

### Theme System
- **Dark Mode** & **Light Mode** toggle
- Persistent theme throughout the application
- Beautiful transitions

## 🏗️ Project Structure

```
collegecampushub/
├── public/
│   └── clubsData.json          # All club data and user credentials
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Navbar.jsx          # Navigation with theme toggle
│   │   ├── Dashboard.jsx       # Main landing page
│   │   ├── ClubSection.jsx     # Reusable section component
│   │   ├── ClubCard.jsx        # Individual club card
│   │   ├── ClubDetails.jsx     # Detailed club view
│   │   ├── RegistrationForm.jsx # User registration
│   │   └── ProtectedRoute.jsx  # Route protection component
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication state
│   │   ├── RoleContext.jsx     # User role management
│   │   └── ThemeContext.jsx    # Dark/Light theme
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # React entry point
│   ├── index.css               # TailwindCSS imports
│   └── App.css                 # (empty - using Tailwind)
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🔐 Demo Credentials

### Student Account
- **Email**: `deepa@college.com`
- **Password**: `deepa123`
- **Role**: Student

### Admin Account
- **Email**: `admin@college.com`
- **Password**: `admin123`
- **Role**: Admin

### Other Student
- **Email**: `john@college.com`
- **Password**: `john123`
- **Role**: Student

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm

### Installation

1. **Clone/Extract the project**
```bash
cd collegecampushub
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
- Visit `http://localhost:5174` (or the port shown in terminal)

## 📱 Usage Guide

### Login
1. Enter email and password from the credentials above
2. Click "Sign In"
3. On success, redirected to dashboard

### Navigation
- Use **Navbar** to:
  - View welcome message
  - Toggle dark/light theme (🌙/☀️)
  - Logout

### Explore Clubs
1. Browse Technical and Cultural clubs on dashboard
2. See recruitment status (Open/Closed)
3. View member count and upcoming events

### View Club Details
1. Click "View Details" on any club card
2. See full description, events, and contact info
3. (Admin only) Toggle recruitment status

### Register for a Club
1. Click "Register" on club card or details page
2. Fill in name, email, and branch
3. Submit registration
4. See success message (auto-redirects after 2 seconds)

## 🎨 Tech Stack

- **Frontend Framework**: React 19 with Hooks
- **Routing**: React Router v7
- **Styling**: TailwindCSS 4
- **State Management**: Context API + useState/useEffect
- **Data Source**: JSON file (public/clubsData.json)
- **Build Tool**: Vite

## 🔑 Key React Concepts Used

✅ **Functional Components** - All components are functional
✅ **Hooks** - useState, useEffect, useContext
✅ **Props** - Data passing between components
✅ **Context API** - Global state management (Auth, Theme, Role)
✅ **React Router** - Client-side routing
✅ **Conditional Rendering** - Theme-based UI changes
✅ **Event Handling** - Form submissions, button clicks

## 🛡️ Protected Routes

- **Login Page**: Public (no authentication required)
- **Dashboard**: Protected (requires login)
- **Club Details**: Protected (requires login)
- **Registration**: Protected (requires login)

Attempting to access protected routes without login redirects to login page.

## 🎯 Role-Based Features

### Student
- View all clubs
- View club details
- Register for clubs
- View their profile
- Toggle theme

### Admin
- All student features +
- Update club recruitment status
- Admin badge in navbar

## 💾 Data Management

All data is stored in `public/clubsData.json`:

```json
{
  "users": [...],           // Login credentials
  "technicalClubs": [...],  // 9 technical clubs
  "culturalClubs": [...]    // 8 cultural clubs
}
```

**Note**: Changes made in the app (e.g., registration, recruitment status) are stored in component state only and reset on page reload (no backend persistence).

## 🎨 Theming

The app automatically applies theme colors based on `isDark` state:

**Light Mode**:
- White backgrounds
- Dark text
- Blue gradients

**Dark Mode**:
- Gray-900 backgrounds
- Light text
- Purple accents

Toggle theme using the 🌙/☀️ button in navbar.

## 📊 Features Breakdown

| Feature | Status | Notes |
|---------|--------|-------|
| Login System | ✅ Complete | Validates against JSON data |
| Authentication | ✅ Complete | Context API based |
| Dashboard | ✅ Complete | Shows notices & all clubs |
| Club Details | ✅ Complete | Full club information |
| Registration | ✅ Complete | Form with validation |
| Admin Controls | ✅ Complete | Toggle recruitment status |
| Dark Mode | ✅ Complete | Full theme support |
| Responsive Design | ✅ Complete | Mobile, Tablet, Desktop |
| Routing | ✅ Complete | Protected & public routes |

## 🔧 Development

### Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### File Size
- No external UI framework dependencies (only TailwindCSS)
- Lightweight and fast
- Vite ensures optimal bundling

## 🐛 Troubleshooting

**Port 5173 already in use?**
- Vite will automatically use the next available port (5174, 5175, etc.)

**Login not working?**
- Check email and password match exactly (case-sensitive)
- Ensure `public/clubsData.json` is present

**Styles not applying?**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server (Ctrl+C then `npm run dev`)

**Dark mode not working?**
- Ensure ThemeProvider wraps the entire app
- Check browser localStorage isn't blocking

## 📝 Code Examples

### Using Auth Context
```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isLoggedIn, login, logout } = useAuth();
  // Use these to manage authentication
}
```

### Using Theme Context
```jsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  // Render based on isDark value
}
```

### Using Role Context
```jsx
import { useRole } from './context/RoleContext';

function MyComponent() {
  const { role, isAdmin, isStudent } = useRole();
  // Show admin controls if isAdmin
}
```

## 🎓 Learning Value

This project demonstrates:
- React Functional Components
- Hooks: useState, useEffect, useContext
- Context API for state management
- React Router v7 for navigation
- TailwindCSS for utility-first styling
- Component composition and reusability
- Form handling in React
- Conditional rendering
- Responsive design

Perfect for interviews and viva questions!

## 📄 License

This project is created for educational purposes.

---

**Happy Coding! 🚀**

Questions? Check the components - they're well-commented and beginner-friendly!

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
