FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Add version verification
RUN npx playwright --version

ENTRYPOINT ["npx", "playwright"]
CMD ["test", "--project=chromium"]
