# Codelabz Local Development Docker Guide

## ⚠️ Prerequisites: Environment Variables

Before running the Docker container for the very first time, you **must** have a valid `.env` file in the root of the `Codelabz` directory.

1. Locate `.env.sample`.
2. Copy it and rename the copy to `.env`.
3. Ensure it has valid Firebase configurations in it.
   _(If you skip this step, the Docker container may fail to boot!)._

---

## 🚀 Daily Workflow Commands

Run all of these commands from inside the `Codelabz/` directory.

### 1. The Initial Run (First time only, or when you add an NPM package)

Use this command to download the emulators, install NPM modules, and build the initial container logic. This takes the longest time constraint.

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

_(The `-d` runs it silently in the background so you can freely use your terminal!)_

### 2. View the Local Servers

Once the container is running:

- **Web App / Hot-Reloading:** [http://localhost:5173](http://localhost:5173)
- **Firebase Emulators UI:** [http://localhost:4000](http://localhost:4000)

### 3. Stop the Server (End of day)

When you want to stop working, do not use `docker compose down` unless you want to destroy the container. Simply pause it instead:

```bash
docker compose -f docker-compose.dev.yml stop
```

### 4. Restart the Server (Next day)

Turn it back on instantly (takes ~1 second), preserving all modules and databases exactly as they were:

```bash
docker compose -f docker-compose.dev.yml start
```

### 5. View Logs (Optional)

If you ever want to see your local Vite logs (e.g., to look at console output or an error message):

```bash
docker compose -f docker-compose.dev.yml logs -f
```

_(Press `Ctrl+C` to exit the logging view)._

---

## 🏗️ Production Environment Testing

If you want to test the multi-stage, production-ready Nginx build locally:

1. Ensure your `.env` file is fully configured securely.
2. Run the production construct:
   ```bash
   docker compose up --build -d
   ```
3. The production-ready app will be served securely from Nginx at **[http://localhost:8000](http://localhost:8000)**.

**Note on Ports:**
If you want to run the production app on a different port (for example, `3000`), simply open `docker-compose.yml` and change the mapping under `ports:`.
The format is `"HOST_PORT:CONTAINER_PORT"`. Change `"8000:80"` to `"3000:80"` and restart. Never change the second number (`:80`), as that is the internal Nginx port.
