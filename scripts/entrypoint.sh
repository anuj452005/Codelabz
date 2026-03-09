#!/bin/sh
set -e

# Start Firebase Emulators in the background
firebase emulators:start --import=testdata --project "${FIREBASE_PROJECT:-demo-sampark}" &

# Wait reliably for the Emulator UI to become available on port 4000
wait-on tcp:4000

# Start Vite dev server for hot-reloading
npm run dev -- --host &

wait
