Welcome! This is a simple repo showing how to set up a bunch of things web apps usually need.

## Running

```bash
pnpm install
# dev
pnpm run watch

# prod
pnpm run build
pnpm run start
```

## Environment Variables

Here are some environment variables you may want to set.

```bash
# Database
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_DATABASE
```

You can set them in a `.env` file or `.env.local` file at the root of your project. The `.env.local` file is for local dev and shouldn't be checked in. `.env` can be checked in, but remember not to check in sensitive information.

## Set up local database

```bash
pnpm run migrate up
pnpm run seed run
```

## Migrations

Migrations are done with Kysely. To run migrations, use the following command:

```bash
pnpm run kysely migrate make <migration-name>
pnpm run kysely migrate list
pnpm run kysely migrate up
pnpm run kysely migrate down
```

Kysely will create two tables named `kysely_migration` and `kysely_migration_lock`. These tables are used to keep track of which migrations have been run.

## Authentication
If you want to do authentication with Firebase (which I highly recommend, it's very simple), [read this guide](docs/auth.md).

## Claude plugin setup

Add the `webapp` plugin from the [egon-market](https://github.com/egonSchiele/egon-market) marketplace.