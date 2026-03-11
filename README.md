# MU-TH-ER

**M**ulti-**U**ser **T**racking **H**ub for **E**ntertainment **R**esources

## About

MU-TH-ER is a collaborative movie selection tool designed for groups. When multiple people want to go to the movies together, MU-TH-ER helps them agree on which movie to see and at what showtime. Each user picks the movies and times that work for them, and MU-TH-ER finds the best match for the group.

## Tech Stack

- **Next.js 16** - React framework (App Router)
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Drizzle ORM** - TypeScript ORM for database access
- **SQLite** (via better-sqlite3) - Lightweight embedded database
- **ESLint** - Code linting

## Roadmap

- [ ] User authentication and group creation
- [ ] Movie data fetched from IMDb
- [ ] Showtime data from the Pathe API
- [ ] Voting system for group movie & showtime selection

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).
