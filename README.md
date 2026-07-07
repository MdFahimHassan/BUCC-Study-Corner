# 📚 BRAC University Computer Club Study Corner

Welcome to the **BRAC University Computer Club (BUCC) Study Corner** repository.

Study Corner is a centralized learning platform built for BUCC members to access high-quality educational resources in one place. The platform aggregates freely available learning materials from trusted sources such as YouTube and other educational websites, allowing members to discover, organize, and stream content without having to search across multiple platforms.

Our goal is to make learning more accessible, structured, and collaborative for every member of the club.

---

# 🎯 Project Objectives

The Study Corner aims to:

* Provide a centralized repository of learning resources.
* Help members discover curated educational content.
* Organize learning materials by category and topic.
* Reduce the time spent searching for quality resources.
* Encourage self-paced learning and continuous skill development.
* Support BUCC workshops, bootcamps, and learning initiatives.

---

# 🏗️ Technology Stack

## Frontend

* React
* Vite
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis (Authentication sessions and rate limiting) (optional)

## DevOps

* GitHub
* GitHub Actions (CI)
* Vercel (Frontend Deployment)

---

# 📁 Project Structure

```text
study-corner/
│
├── client/                 # React Frontend
│
├── server/                 # Express Backend
│
├── .github/
│   └── workflows/          # GitHub Actions
│
├── README.md
├── .gitignore
└── LICENSE
```

---

# 🌿 Branching Strategy

This repository follows a **feature branch workflow**.

## Main Branch

* `main`

  * Production-ready branch.
  * Protected from direct pushes.

## Feature Branches

Every new feature should be developed in its own branch.

Examples:

```text
feature/auth
feature/video-library
feature/admin-dashboard
feature/search
feature/frontend-home
```

## Bug Fixes

```text
bugfix/login-error
bugfix/video-player
```

## Hotfixes

```text
hotfix/token-expiry
```

---

# 🔄 Development Workflow

1. Clone the repository.
2. Create a new feature branch from `main`.
3. Implement your feature.
4. Commit your changes with meaningful commit messages.
5. Push the branch to GitHub.
6. Open a Pull Request targeting `main`.
7. Wait for CI checks and code review.
8. Merge after approval.

Direct commits to `main` are not allowed.

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone <repository-url>
cd study-corner
```

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
npm run dev
```

---

# 🧪 Continuous Integration

GitHub Actions automatically performs the following checks on every push and pull request:

* Install project dependencies
* Build the frontend application
* Run linting (when configured)
* Run automated tests (when configured)

---

# 🌐 Deployment

The frontend application is deployed using **Vercel**.

Every successful merge to the `main` branch automatically triggers a new deployment after the deployment pipeline has been configured.

---

# 🤝 Contributing

We welcome contributions from BUCC members.

Before contributing:

* Create a feature branch.
* Follow the project's coding standards.
* Keep pull requests focused on a single feature or fix.
* Ensure the application builds successfully before opening a Pull Request.

---

# 👥 Maintainers

This project is developed and maintained by the **BRAC University Computer Club**.
