# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install --workspaces

# Copy source code
COPY backend/src ./backend/src
COPY backend/tsconfig.json ./backend/

# Build
RUN npm run build --workspace=policy-qa-backend

EXPOSE 3000

CMD ["npm", "start", "--workspace=policy-qa-backend"]
