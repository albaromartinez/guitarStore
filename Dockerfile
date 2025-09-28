FROM node:24.4-alpine
# Set the working directory
WORKDIR /app
#install dependencies
# RUN apk add sudo && shadow && curl
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install dependencies
RUN npm install 
# Copy the rest of the application code         
COPY . .
# Expose the port the app runs on
EXPOSE 8000

CMD ["npm", "run", "dev", "--", "--host"]
