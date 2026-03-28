# vuln-app

Simple vulnerable SaaS web app starter built with Node.js and Express.

## Structure

```text
vuln-app/
├─ app.js
├─ package.json
├─ package-lock.json
├─ README.md
├─ public/
│  ├─ css/
│  ├─ js/
│  └─ images/
├─ routes/
│  ├─ auth.js
│  ├─ dashboard.js
│  ├─ profile.js
│  ├─ admin.js
│  └─ upload.js
├─ views/
│  ├─ login.html
│  ├─ register.html
│  ├─ dashboard.html
│  ├─ profile.html
│  ├─ admin.html
│  └─ upload.html
├─ models/
│  ├─ user.js
│  └─ file.js
└─ uploads/
```

## Notes

- `app.js` is the main server entry point.
- `routes/` holds feature-based route files.
- `views/` holds HTML pages.
- `models/` holds database model files.
- `public/` holds static assets.
- `uploads/` stores uploaded files and is ignored by git.

## Status

Project structure only. No application logic has been added yet.
