# blog-v2-admin

SvelteKit admin CMS for managing blog posts and comments.

## Setup

```bash
npm install
cp .env.example .env
```

Set `PUBLIC_API_HOST` to your Rails API URL (e.g. `http://localhost:3000`).

Create an admin user in the Rails backend before logging in (see `blog-v2-backend/README.md`).

## Run locally

Start the Rails backend first, then:

```bash
npm run dev
```

Visit http://localhost:5174

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (port 5174) |
| `npm run build` | Production build |
| `npm run check` | Type-check |
