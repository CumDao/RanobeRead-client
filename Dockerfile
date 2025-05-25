FROM node:latest AS build
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .


RUN echo "VITE_API_URL=https://ranobe-read.ru/api\nVITE_GOOGLE_RECAPTCHA_SITE_KEY='6Le4C9YqAAAAAG5ua-U0yolPsDknGs83L3M6975K'" >> .env.production
RUN npm run build

FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 5000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
