# Notion HMT Frontend

Frontend for the Notion HMT editor workspace.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- TanStack Query
- Tiptap

## Main UI Areas

- sidebar document tree
- workspace header
- document editor page
- command palette
- slash menu
- bubble menu

## Run

```powershell
npm install
npm run dev
```

## Environment

Create or keep [`FE/.env.local`](C:/Notion%20HMT/FE/.env.local):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_DEFAULT_WORKSPACE_ID=workspace_default
```

## Notes

- frontend talks to the backend through repository/service boundaries
- TanStack Query handles server state
- Zustand is used only for local UI state where appropriate
- the app is designed to stay backend-ready without major rewrites
