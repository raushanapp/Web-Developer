# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  # RoboFriends

  RoboFriends is a small React and TypeScript directory app built with Vite. It loads a collection of users and presents them as robot-themed profile cards. The project is part of a web development course and demonstrates React class components, state, lifecycle methods, reusable components, and live filtering.

  ## Features

  - Fetches user data from the JSONPlaceholder API when the app starts
  - Shows a loading state while the data is being requested
  - Filters users instantly by name through the search field
  - Displays each user's generated RoboHash image, name, and email address
  - Renders cards through reusable `Card` and `CardList` components
  - Provides a scrollable results area for the card collection
  - Uses TypeScript for component props and application state

  ## Tech Stack

  - React 19
  - TypeScript
  - Vite
  - ESLint
  - JSONPlaceholder for user data
  - RoboHash for robot images

  ## Getting Started

  ### Prerequisites

  - Node.js installed locally
  - pnpm installed locally

  ### Installation

  ```bash
  pnpm install
````

### Run the development server

```bash
pnpm dev
```

Vite will print the local URL in the terminal. Open that URL in a browser to use the app.

## Available Scripts

| Command        | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `pnpm dev`     | Starts the Vite development server with hot module replacement |
| `pnpm build`   | Type-checks the project and creates a production build         |
| `pnpm lint`    | Runs ESLint across the project                                 |
| `pnpm preview` | Serves the production build locally                            |

## Data Sources

User data is requested from [`jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users). Robot avatars are generated using the user's ID with [RoboHash](https://robohash.org/). The app therefore needs an internet connection to load the user list and avatar images.

## Project Structure

```text
src/
  components/  Reusable search, card, and scroll components
  data/        Local robot data used for TypeScript typing
  pages/       Card list page component
  App.tsx      Application state, data fetching, and filtering
```
