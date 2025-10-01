# Use an official Nginx image as the base
FROM nginx:alpine

# Copy the HTML and JavaScript files into the Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
