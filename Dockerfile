# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy the .env file
COPY .env .env

# Copy the app source and build the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the built app with a lighter image
FROM node:18-alpine

WORKDIR /app

# Copy only the built output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]
