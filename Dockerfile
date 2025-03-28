# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port (same as in main.ts)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
