# Use an official Node.js runtime as base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all source files
COPY . .

# Expose port (change if your app uses another)
EXPOSE 4000

# Define environment variables (optional)
ENV NODE_ENV=production

# Run the app
CMD ["npm", "start"]
