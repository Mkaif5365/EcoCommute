# EcoCommute+ - Smart & Sustainable Urban Transport Solution



## 📋 Project Overview

EcoCommute+ is an innovative web application designed to make urban transportation more sustainable, efficient, and accessible. The platform helps users integrate various transportation options (public transit, ride-sharing, bike-sharing), reduce carbon emissions, and decrease urban congestion.

### 🌍 Problem Statement

In urban areas, there are several transportation-related challenges:
- Increasing traffic congestion and long commute times
- Air pollution and carbon emissions from transportation
- Lack of integration between different transport systems
- Limited access to public transit and shared mobility options

### 💡 Our Solution

EcoCommute+ addresses these challenges by:
- **Integrated Transport Options**: Bringing all available transport options onto a single platform
- **Real-time Mapping**: Providing real-time navigation and transport information using Mappls API
- **Ride-Sharing**: Enabling users to share rides and reduce carbon footprint
- **Gamification and Rewards**: Incentivizing sustainable transport choices through a reward system

## 🚀 Features

- **Interactive Maps**: Real-time mapping and navigation through integration with Mappls API
- **Transport Option Search**: Search and filtering for different transport modes (metro, bus, ride-share, bike-share)
- **Ride-Sharing Platform**: Allows users to offer or find rides
- **Rewards System**: Points and badges for using sustainable transport options
- **Carbon Footprint Tracking**: Allows users to see the environmental impact of their transport choices

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Mapping**: Mappls API (India-focused mapping service)
- **UI Components**: shadcn/ui, Lucide React (icons)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS, CSS Modules

## 📦 Installation and Setup

### Requirements

- Node.js (v18 or higher)
- npm or yarn
- Mappls API key (obtain from developer portal)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/eco-commute-plus.git
cd eco-commute-plus
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file and add your Mappls API key:
```
MAPPLS_API_KEY=your_api_key_here
MAPPLS_CLIENT_ID=your_client_id_here
MAPPLS_CLIENT_SECRET=your_client_secret_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Navigate to `http://localhost:3000` in your browser

### Production Build

To create a production build:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🧩 Key Components

### 1. MapplsMap Component
A reusable component for displaying interactive maps. It integrates with the Mappls API and provides various map functionalities.

```typescript
<MapplsMap 
  center={[28.6139, 77.2090]} // Center point (Delhi)
  zoom={12}
  height="500px"
  markers={transportHubs}
  className="shadow-xl rounded-xl"
/>
```

### 2. Landing Page
The main landing page that provides an overview of the application and shows key transport hubs.

### 3. Transport Options Page
Allows users to search and filter different transport options (metro, bus, train).

### 4. Ride-Sharing Page
Allows users to offer or find rides, encouraging carpooling.

### 5. Rewards System
Gamification and incentive system that rewards users for using sustainable transport options.

## 🧪 Testing

To test the project:
```bash
npm test
# or
yarn test
```

## 🚧 Development Challenges

Some key challenges during the development of this project were:

1. **Mappls API Integration**: There were some technical challenges with integrating the Mappls API, especially with Next.js client-side rendering.

2. **Real-time Data Management**: Integrating and displaying real-time data for various transport options.

3. **Performance Optimization**: Optimizing performance with large amounts of map data and markers.

4. **Responsive Design**: Adapting map and UI components across different device sizes.

## 🔮 Future Development

- **User Authentication**: Full user profiles and authentication system
- **Payment Integration**: In-app payments for ride-sharing
- **AI-based Route Recommendations**: Smart route suggestions based on user preferences
- **IoT Integration**: Integration with smart city sensors and data
- **Mobile App**: iOS and Android apps for native mobile experience

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- College Canvas
- Hariom Gupta- Lead Developer
- Mohammad Kaif - UI/UX Designer
- Tushar Yadav - Backend Developer

## 📞 Contact

For more information, please contact:
- Email: collegecanvas2004@gmail.com
- Contact: 9667039413
- GitHub: https://github.com/CollegeCanvas

---

  <i>For a smarter, more sustainable future</i>
</p> 