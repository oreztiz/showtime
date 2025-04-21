<p align="center">
  <img src="./src/assets/logo.png" width="256" alt="Showtime">
</p>

# Showtime - TV Show Dashboard

## Introduction

Showtime is a responsive and user-friendly TV show dashboard built using Vue.js. It leverages the [TVMaze API](http://www.tvmaze.com/api) to display TV shows categorized by genre and sorted by ratings. Users can search for TV shows by name and view detailed information about a selected show. The application is designed with clean code, reusability, and frontend best practices in mind.

---

## Features

- **Genre-based Categorization**: TV shows are grouped by genre and displayed in horizontal scrollable lists.
- **Search Functionality**: Users can search for TV shows by name.
- **Detailed Show View**: Clicking on a show redirects users to a detailed view with comprehensive information.
- **Responsive Design**: The application is mobile-friendly and adapts to different screen sizes.
- **Lazy Loading**: Images are lazy-loaded to improve performance.
- **Smooth User Experience**: Includes hover effects, transitions, and a clean UI.

---

## Architectural Decisions

### Framework: Vue.js
- Vue.js is a progressive framework that allows for building scalable and maintainable applications.
- Its component-based architecture promotes reusability and clean code.
- Vue's ecosystem simplifies state management (Pinia) and routing (Vue Router).

### State Management: Pinia
- Pinia is used for managing the application's state, specifically for storing and categorizing TV shows by genre. It provides a simple and modern API for state management.

### API Integration
- The [TVMaze API](http://www.tvmaze.com/api) is used to fetch TV show data. Since the API does not provide a direct endpoint for shows by genre, the data is processed and categorized on the client side.

### Styling
- The application uses scoped CSS with a BEM-like naming convention for maintainability.
- CSS variables are used for theming and consistency.

### Responsiveness
- Media queries ensure the application is mobile-friendly and adapts to various screen sizes.

---

## Installation and Setup

### Prerequisites
- **Node.js**: v18.x or higher
- **NPM**: v9.x or higher

### Steps to Run the Application
1. Clone the repository:
```bash
git clone https://github.com/oreztiz/showtime.git
cd showtime
```

2. install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open the application in your browser at http://localhost:5173

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run format`: Formats the codebase using Prettier.
- `npm run test`: Runs unit tests using Vitest.

---

## Git Commit Guidelines

This project follows the [Gitmoji](https://gitmoji.dev/) convention for commit messages. Gitmoji provides a standardized way to add emojis to your commit messages, making them more expressive and easier to understand.

### Examples:
- ✨ `:sparkles:` for adding new features
- 🐛 `:bug:` for fixing bugs
- 🎨 `:art:` for improving code structure or formatting
- ✅ `:white_check_mark:` for adding tests
- 📝 `:memo:` for updating documentation
