# Use official Node image (Linux) so esbuild works correctly
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json first (for caching)
COPY package*.json ./

# Install deps
RUN npm install

# Copy rest of the project
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Default command: start Vite server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
