FROM node:latest AS build
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
ARG VITE_API_URL
ARG VITE_GOOGLE_RECAPTCHA_SITE_KEY
ARG VITE_ENV

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_GOOGLE_RECAPTCHA_SITE_KEY=${VITE_GOOGLE_RECAPTCHA_SITE_KEY}
ENV VITE_ENV=${VITE_ENV}
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
