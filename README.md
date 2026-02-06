# Mniej z Innymi - Frontend

EN: A web application designed to help travelers find companions to share group railway tickets (like "Taniej z Bliskimi"), reducing travel costs for everyone.
PL: Aplikacja internetowa stworzona, aby pomagać podróżnym w znalezieniu osób, z którymi mogą wspólnie kupić bilety kolejowe (poprzez „Taniej z Bliskimi”), co pozwala obniżyć koszty podróży dla każdego.

## Features

- **Journey Reporting**: Easily submit your travel plans to find potential companions.
- **Offer Discovery**: Browse current journey reports from other travelers.
- **Push Notifications**: Stay updated with Firebase Cloud Messaging (FCM).
- **Responsive Design**: Built with Tailwind CSS and Radix UI for a modern, accessible interface.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Backend Services**: [Firebase](https://firebase.google.com/) (Auth, Notifications)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BartTed1/Mniej-z-Innymi.git

2. Install dependencies:
  ```bash
  npm install
  ```
4. Set up environment variables: Create a .env file in the root directory and add your Firebase configuration.
5. Run the development server
  ```bash
  npm run dev
  ```
## Project Structure

- src/components: UI components and feature-specific components.
- src/hooks: Custom React hooks (auth, notifications, offers).
- src/assets: Static assets like geojson data.
- public: Static public assets.
