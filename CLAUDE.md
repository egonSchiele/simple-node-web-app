This is a web app written in React, TypeScript, and Node. Kysely is used as the ORM, and Vite is used to build assets. All the frontend code lives in `src/frontend`, while the backend lives in `src/backend`.

## notable files and folders
- `src/frontend/`: Contains all the frontend code, including React components, pages, and styles.
- `src/backend/`: Contains all the backend code, including API routes, database access, and middleware.
- `src/backend/routes/api/`: Contains all the API routes for the backend.
- `src/common/`: Contains code that is shared between the frontend and backend, such as types and utility functions.

## to add a new page
All the entry points are html files under `pages/`. To add a new entry point, you'll need to add a new HTML page here, add a corresponding .tsx file under `src/frontend/pages/`, add a new entry in `vite.config.ts` under `build.outDir.rollupOptions.input`, and if needed, add a new path alias in `src/backend/lib/router/entrypoints.ts`.

## API routes
All API routes live in `src/backend/routes/api`. Routing happens with the `express-file-routing` package. Each API route exports one or more functions named after HTTP verbs like get, post, put, and del (for DELETE). So, for example, if you wanted to create a new route like

```
POST /api/users
```

you would create a file `src/backend/routes/api/users.ts` and export a function named `post`:

```typescript
import { Request, Response } from "express";
export const post = async (req: Request, res: Response) => { ... }
```

Make sure to import `Request` and `Response` from the `express` package.

To export a wildcard route, use a default export:

```typescript
export default async (req, res) => { ... }
```

See `src/backend/routes/api/moods.ts` for an example. 

Some route examples:

```
/routes/index.ts → /
/routes/posts/index.ts → /posts
/routes/posts/[id].ts → /posts/:id # dynamic parameter
/routes/users.ts → /users
```


All route functions should return a value instead of sending it to the client using `res.json`. The return value should be a `Result` type, which can be either a `Success` or a `Failure`. These types are defined in the file `"@/common/types.js"`. You can use the `success` and `failure` convenience functions to create these types. For an example of how to return a value, see src/backend/routes/api/batches.ts.

All return values should be typed, and all types are stored in the `src/common/apiTypes/` directory. All input bodies should be validated using Zod, and the Zod schemas should be stored in the same file in the API types directory. You should also create a type out of the Zod schema so we can use that type on the frontend. See `src/common/apiTypes/moods.ts` for an example.



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

## Input validation
For input validation, you can use the `zod` package. This package allows you to define schemas for your input data and validate it easily. Here's an example of how to use it:

```typescript
import { z } from "zod";
import { Request, Response } from "express";
export const post = async (req: Request, res: Response) => {
  const schema = z.object({
    name: z.string().min(1),
    age: z.number().int().positive(),
  });

    const validatedData = schema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json({
      error: "Invalid input",
      details: validatedData.error.errors,
    });
  }
  const { name, age } = validatedData.data;
  // Now you can use name and age safely
};
```


## Relative vs. Absolute Imports

Always prefer absolute imports.  There are path aliases defined in `src/frontend/tsconfig.json` and `src/backend/tsconfig.json`. For example, if you wanted to write an absolute import for the file at 

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
This repo uses a custom component library called `egon-ui` for styling. Prefer using the components exported from this package. For other ad-hoc styling, follow these guidelines:

For smaller CSS changes, you can add them inline using Tailwind. For larger CSS styling, or CSS styling you think could be reused, please add alongside CSS files and then import them. For example, to add styling for `Posts.tsx`, you might create `posts.css` and then import it into Posts.tsx like this:

```typescript
import "./posts.css";
```

## database changes
In order to make a database change, you'll need to add a few things:
1. Add a migration in `db/migrations`.
2. Add or modify types in `src/backend/db/types.ts`.
3. Add finders as needed. You can look at `src/backend/db/mood.ts` for an example.


### migrations
Migrations are done with Kysely. To run migrations, use the following commands:

```bash
pnpm run kysely migrate make <migration-name>
pnpm run kysely migrate list
pnpm run kysely migrate up
pnpm run kysely migrate down
```

When creating a new table, if the table has a primary key, please add auto-increment to that field.

## General code quality guidelines
- Avoid having excessively long functions. Split up long functions into multiple functions where it makes sense. Each function should do one thing.
- Split up a React component into sub-components when it makes sense.
- Avoid sharing state. Make as many things private as possible. This will make code much easier to reason about.
- Have no side effects, if possible. All functions should be deterministic when possible, accepting inputs and returning outputs, and avoiding modifying any shared state in between. 

## Guidance on reusable subcomponents.
Please create reusable subcomponents where it would help to reduce code duplication. If you create a subcomponent, please put it in its own directory. For example, if you create a subcomponent `Bar.tsx` for a component `Foo.tsx`, please put it at `Foo/Bar.tsx`.
