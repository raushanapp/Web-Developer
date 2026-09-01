# RoboFriends

RoboFriends is a React + TypeScript app built with Vite that fetches a list of users from JSONPlaceholder and displays them as robot-themed cards. The app includes live search, a loading state, and reusable UI components for a clean directory-style interface.

## Latest update

This project has been updated to reflect the current implementation of the app rather than the default Vite starter template. It now documents the real app behavior, including:

- fetching user data on mount
- filtering results from the search box
- showing a loading screen before the data loads
- using reusable card, scroll, and search components
- building the app with React 19, TypeScript, and Vite

## Features

- Fetches user data from the JSONPlaceholder API
- Displays a loading state while data is being fetched
- Filters users in real time by name
- Renders each user as a RoboHash-styled profile card
- Shows name and email details in a card list layout
- Uses reusable React components for search and scrolling
- Written in TypeScript for safer component props and state handling

## Tech stack

- React 19
- TypeScript
- Vite
- ESLint
- JSONPlaceholder API
- RoboHash avatars

## Getting started

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Then open the local URL shown in the terminal in your browser.

## Available scripts

| Command        | Description                            |
| -------------- | -------------------------------------- |
| `pnpm dev`     | Starts the Vite development server     |
| `pnpm build`   | Creates a production build for the app |
| `pnpm lint`    | Runs ESLint on the project             |
| `pnpm preview` | Serves the production build locally    |

## Data source

User records are loaded from JSONPlaceholder at `https://jsonplaceholder.typicode.com/users`, and each user's avatar is created using their ID with RoboHash.

## Project structure

```text
src/
  App.tsx         Main app logic, data fetching, and filtering
  components/     Search, scroll, and card elements
  data/           Local data and TypeScript model support
  pages/          Card list page rendering
  assets/         Static project assets
  hooks/          Custom React hooks
  store/          Redux-related action and reducer files
  styles/         Component styling files
```

## Notes

This project is part of a web development learning exercise and demonstrates core React concepts such as state management, component composition, API calls, and real-time user filtering.
