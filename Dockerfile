# Stage 1: Build Image
# We use node:18-slim identically to dev to prevent native compilation mismatch issues
FROM node:18-slim AS build

WORKDIR /app

# Accept Firebase arguments to inject dynamically at build-time (Required by Vite)
ARG VITE_APP_FIREBASE_API_KEY
ARG VITE_APP_AUTH_DOMAIN
ARG VITE_APP_DATABASE_URL
ARG VITE_APP_FIREBASE_PROJECT_ID
ARG VITE_APP_FIREBASE_STORAGE_BUCKET
ARG VITE_APP_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_APP_FIREBASE_APP_ID
ARG VITE_APP_FIREBASE_MEASUREMENTID
ARG VITE_APP_USE_EMULATOR
ARG VITE_APP_FIREBASE_FCM_VAPID_KEY

ENV VITE_APP_FIREBASE_API_KEY=$VITE_APP_FIREBASE_API_KEY
ENV VITE_APP_AUTH_DOMAIN=$VITE_APP_AUTH_DOMAIN
ENV VITE_APP_DATABASE_URL=$VITE_APP_DATABASE_URL
ENV VITE_APP_FIREBASE_PROJECT_ID=$VITE_APP_FIREBASE_PROJECT_ID
ENV VITE_APP_FIREBASE_STORAGE_BUCKET=$VITE_APP_FIREBASE_STORAGE_BUCKET
ENV VITE_APP_FIREBASE_MESSAGING_SENDER_ID=$VITE_APP_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_APP_FIREBASE_APP_ID=$VITE_APP_FIREBASE_APP_ID
ENV VITE_APP_FIREBASE_MEASUREMENTID=$VITE_APP_FIREBASE_MEASUREMENTID
ENV VITE_APP_USE_EMULATOR=$VITE_APP_USE_EMULATOR
ENV VITE_APP_FIREBASE_FCM_VAPID_KEY=$VITE_APP_FIREBASE_FCM_VAPID_KEY

# Build Cache Optimization: Copy only package files first to cache the layer
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the files and build the application
COPY . .
RUN npm run build

# Stage 2: Production Serving Image
FROM nginx:alpine AS production

# (Optional) Inject a custom Nginx conf here to handle SPA routing fallback to index.html
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
    try_files $uri $uri/ /index.html;\n\
    }\n\
    }\n' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
