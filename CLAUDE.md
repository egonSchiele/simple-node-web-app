This is a web app written in React, TypeScript, and Node. Kysely is used as the ORM, and Vite is used to build assets. All the frontend code lives in `src/frontend`, while the backend lives in `src/backend`.

## to add a new page
All the entry points are html files under `pages/`. To add a new entry point, you'll need to add a new HTML page here, add a corresponding .tsx file under `src/frontend/pages/`, add a new entry in `vite.config.ts` under `build.outDir.rollupOptions.input`, and if needed, add a new path alias in `src/backend/lib/router/entrypoints.ts`.

## API routes
All API routes live in src/backend/routes/api`. Routing happens with the `express-file-routing` package. Each API route exports one or more functions named after HTTP verbs like get, post, put, and del (for DELETE). So, for example, if you wanted to create a new route like

```
POST /api/users
```

you would create a file `src/backend/routes/api/users.ts` and export a function named `post`:

```typescript
export const post = async (req, res) => { ... }
```

To export a wildcard route, use a default export:

```typescript
export default async (req, res) => { ... }
```

See `src/backend/routes/api/moods.ts` for an example. 

### Middleware

You can add middleware by exporting an array of Express request handlers from your route file:

```typescript
import { isLoggedIn } from "@/backend/lib/middleware/auth.js";

export const get = [
isLoggedIn,
  async (req, res) => { ... }
]
```

All middleware lives in `src/backend/lib/middleware/`. See `src/backend/lib/middleware/auth.js` for an example.

## Relative vs. Absolute Imports

Always prefer absolute imports. There are separate prefixes for `src` and `test`, and they both define path aliases. For example, if you wanted to write an absolute import for the file at 

```
src/backend/lib/middleware/auth.js
```

you would write

```
@/backend/lib/middleware/auth.js
```

Remember to add the `.js` suffix at the end.

## Common code

All code that is common to both the frontend and the backend lives in the `src/common` directory. For example, a lot of types will be shared on both the frontend and the back-end. These types should be added to `src/common/types.ts`.

## error handling
For error handling, instead of throwing exceptions, prefer using the `Result` type defined in `src/common/types.ts`. For functions that can fail, the return type should be a `Result`, and the function should return either a `Success` or a `Failure`.

## styling
This repo uses a custom component library called `egon-ui` for styling. Prefer using the components exported from this package. For other ad-hoc styling, use tailwindcss.

## database changes
In order to make a database change, you'll need to add a few things:
1. Add a migration in `db/migrations`.
2. Add or modify types in `src/backend/db/types.ts`.
3. Add finders as needed. You can look at `src/backend/db/mood.ts` for an example.