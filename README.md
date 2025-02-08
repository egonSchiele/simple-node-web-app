Welcome! This is a simple repo showing how to set up a bunch of things web apps usually need.

## Setup

Run `./scripts/setup.sh` to create a .env file and install dependencies.

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

## Authentication
If you want to do authentication with Firebase (which I highly recommend, it's very simple), you'll need to do the following things.

1. Go to the [Firebase console](https://console.firebase.google.com) and create a new project.
2. Add auth to your project.
3. Go to Project Settings (click the gear icon next to your project name). Under "General", you'll find your Firebase config. The Firebase config contains public information and can be used in the frontend. Add this config to `src/frontend/lib/firebase.ts`. 
4. Next, generate a new service account key. Go to the "Service accounts" tab and click `Generate new private key`. This key is *private* and must *never* be shown to users or checked into a git repo! Store this JSON file at config/firebase-adminsdk.json.
5. Add these lines to `.env`:

```
FIREBASE_CONFIG=config/firebase-adminsdk.json
GOOGLE_APPLICATION_CREDENTIALS=config/firebase-adminsdk.json
```

**That's it!** Now visit `http://localhost:3000/signup.html` to sign up as a new user. Then you can visit `https://console.firebase.google.com/project/<your-app-name>/authentication/users` to see your list of users.