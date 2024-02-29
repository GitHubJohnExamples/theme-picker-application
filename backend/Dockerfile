# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Expose the port on which the backend runs
EXPOSE 3001

# Start the backend application
CMD ["npm", "start"]
