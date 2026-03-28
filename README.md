# vuln-app

Simple Node.js and Express app backed by SQLite.

This project is a work in progress and is being built in public.

## Stack

- Node.js
- Express
- SQLite

## Current features

- User registration
- User login
- Static HTML pages served by Express
- Local SQLite database

## Project structure

```text
vuln-app/
├─ app.js
├─ package.json
├─ db/
├─ models/
├─ pages/
├─ public/
├─ routes/
└─ uploads/
```

## Run locally

```bash
npm install
node app.js
```

The app runs on `http://localhost:3000`.

## Routes

- `GET /`
- `GET /register`
- `GET /admin`
- `GET /dashboard`
- `GET /profile`
- `GET /upload`
- `POST /`
- `POST /register`

## Notes

- Some route files are still empty
- `/dashboard` is wired in the server, but the matching HTML page is not currently in the repo
- This is not production-ready yet
