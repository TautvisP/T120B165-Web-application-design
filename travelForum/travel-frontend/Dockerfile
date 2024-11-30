# Dockerfile for React Frontend

# Build stage
FROM node:18 as build

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy project
COPY . /app/

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]