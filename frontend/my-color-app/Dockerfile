# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app/frontend/my-color-app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Expose the port on which the frontend runs
EXPOSE 5173

# Start the frontend application
CMD ["npm", "run", "dev"]