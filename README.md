# Cosmic Event Tracker
# [Cosmic Event Tracker](https://cosmic-event-tracker-six.vercel.app/#events) 

A luxury space-themed web application that displays information about Near-Earth Objects (NEOs) using NASA's Open APIs. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## About

Cosmic Event Tracker is a modern web application that provides real-time information about Near-Earth Objects (NEOs) through NASA's Open APIs. The application features a stunning space-themed interface with smooth animations, interactive data visualization, and comprehensive asteroid tracking capabilities.

## Key Features

### 🌌 **Interactive NEO Dashboard**
- Real-time data from NASA's NeoWs API
- Date-grouped asteroid listings with hazard indicators
- Interactive selection system for comparative analysis
- Incremental data loading with "Load More" functionality

### 📊 **Advanced Comparison Tools**
- Multi-asteroid selection with checkboxes
- Interactive scatter charts comparing miss distance vs velocity
- Bubble size visualization representing asteroid diameters
- Reusable data caching across comparison sessions

### 🔍 **Comprehensive Asteroid Details**
- Individual NEO detail pages with comprehensive information
- Hazardous asteroid highlighting and classification
- NASA JPL reference links and orbital data
- On-demand data fetching for enhanced information

### 🎛️ **Smart Filtering & Sorting**
- Hazardous asteroid toggle filter
- Date-based sorting (ascending/descending)
- Custom date range selection (3-day limit per NASA API)
- Real-time filter application

### 🔐 **Optional Authentication**
- Supabase integration with GitHub OAuth
- Protected comparison features
- Session management and user state
- Seamless login/logout experience

## Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand for efficient state handling
- **Animations**: Framer Motion for smooth transitions
- **Data Visualization**: Recharts for interactive charts
- **Authentication**: Supabase with OAuth providers
- **APIs**: NASA NeoWs Feed and Lookup APIs

## Core Functionalities

### **NASA API Integration**
- **NeoWs Feed API**: Fetches asteroid data for specified date ranges
- **Neo Lookup API**: Retrieves detailed information for individual asteroids
- **Real-time Data**: Live updates from NASA's asteroid database
- **Error Handling**: Graceful fallbacks and user-friendly error messages

### **Component Architecture**
- **Modular Design**: Reusable components (Header, EventList, NEOCard, FilterBar)
- **State Management**: Centralized Zustand store for data persistence
- **Responsive Layout**: Mobile-first design with adaptive components
- **Animation System**: Page transitions and scroll-triggered animations

### **Data Management**
- **Caching Strategy**: Efficient data storage across page navigation
- **Incremental Loading**: Progressive data fetching for better performance
- **Cross-page Persistence**: Selected asteroids maintained during navigation
- **Optimized Rendering**: Conditional rendering based on data availability

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- NASA API key (free from [api.nasa.gov](https://api.nasa.gov/))
- Supabase account (optional, for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cosmic-event-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env.local` in the project root:
   ```bash
   # Required: NASA API Key
   NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
   
   # Optional: Supabase (for authentication)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   
   # Optional: Footer credit
   NEXT_PUBLIC_APP_FOOTER_CREDIT=Developed by @YourName
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## API Configuration

### NASA API Setup
1. Visit [api.nasa.gov](https://api.nasa.gov/)
2. Sign up for a free account
3. Generate an API key
4. Add to `.env.local` as `NEXT_PUBLIC_NASA_API_KEY`

### Supabase Setup (Optional)
1. Create a Supabase project
2. Enable GitHub OAuth in Authentication → Providers
3. Configure GitHub OAuth App with callback URL
4. Add project URL and anon key to `.env.local`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Alternative Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── compare/           # Comparison page with charts
│   ├── event/[id]/        # Individual asteroid details
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home dashboard
├── components/             # React components
│   ├── anim/              # Animation wrappers
│   ├── ui/                # UI components
│   ├── Header.tsx         # Navigation and controls
│   ├── Footer.tsx         # Footer with credits
│   ├── FilterBar.tsx      # Date range and filters
│   ├── EventList.tsx      # Asteroid list display
│   ├── NEOCard.tsx        # Individual asteroid cards
│   └── Starfield.tsx      # Animated background
├── lib/                    # Utilities and API clients
│   ├── nasa.ts            # NASA API integration
│   ├── supabase.ts        # Supabase client
│   └── auth.ts            # Authentication hooks
└── store/                  # State management
    └── neoStore.ts        # Centralized data store
```

## API Endpoints

- **NASA NeoWs Feed**: `https://api.nasa.gov/neo/rest/v1/feed`
- **NASA Neo Lookup**: `https://api.nasa.gov/neo/rest/v1/neo/{id}`

## Features Implementation

### **Core Functionality** ✅
- [x] Real-time asteroid data from NASA APIs
- [x] Interactive asteroid selection and comparison
- [x] Advanced filtering and sorting capabilities
- [x] Comprehensive asteroid detail views
- [x] Responsive design with smooth animations
- [x] Cross-page data persistence
- [x] Optional user authentication

### **Technical Excellence** ✅
- [x] TypeScript for type safety
- [x] Modern React patterns with hooks
- [x] Efficient state management
- [x] Optimized data fetching and caching
- [x] Professional UI/UX design
- [x] Mobile-responsive layout
- [x] Performance optimizations

## Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Credits

- **NASA**: Near-Earth Object data via NeoWs API
- **Next.js**: React framework and deployment platform
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation and transition library
- **Recharts**: Data visualization components
- **Zustand**: Lightweight state management
