# This repo using for practice with Playwright

This project is a Playwright-based test automation framework for testing web applications. It includes test cases for verifying various functionalities, such as navigating to GitHub links, managing local storage, and performing search flows.

---

## **Getting Started**

### **Prerequisites**

- Node.js (version >= 18)
- npm (Node Package Manager)

### **Installation**

1. Clone the repository:

   ```bash
   git clone git@github.com:zAN41k/techTask2.git
   cd techtask2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### **Running Tests**

#### Run All Tests
To execute all tests in the project:

```bash
npx playwright test
```

#### Run a Specific Test
To run a specific test file:

```bash
npx playwright test tests/searchTC1E2E.spec.ts
```

#### Run Tests in Debug Mode
To debug tests interactively:

```bash
npx playwright test --debug
```

#### Run Tests in Headed Mode
To run tests with a visible browser window:

```bash
npx playwright test --headed
```

#### Run test in UI mode

```bash
npx playwright test --ui
```

#### Generate an HTML Report
To generate a test report:

```bash
npx playwright test --reporter=html
```

The report will be available in the `playwright-report` directory.

## **Running Tests with Docker**

### Updating Playwright
To update Playwright to the latest version (currently 1.52):

1. Update dependencies in package.json:
   ```bash
   npm install @playwright/test@1.52 playwright@1.52
   ```

2. Update browsers:
   ```bash
   npx playwright install
   ```

3. Update Docker image:
   ```bash
   # Rebuild the Docker image with new version
   docker build --no-cache -t playwright-tests .
   ```

4. Clean up old containers and images (optional):
   ```bash
   docker system prune -f
   ```

### Using Docker Compose (Recommended)
The simplest way to run tests locally:

```bash
docker compose run --rm tests
```

The tests run with 4 parallel workers by default. You can modify the number of workers by:

```bash
# Run with 2 workers
docker compose run --rm tests test --workers=2

# Run with 4 workers
docker compose run --rm tests test --workers=4
```

Note: The number of workers should not exceed the number of CPU cores allocated in docker-compose.yml

#### Verify Playwright Version
To check the Playwright version in your Docker container:

```bash
# Make the version check script executable
chmod +x scripts/check-version.sh

# Run the version check
./scripts/check-version.sh
```

Expected output should show:
```
Version 1.52.0
Playwright CLI
```

This command:
- Uses the pre-configured Docker Compose setup
- Automatically handles volume mounting and environment variables
- Removes the container after completion

### Alternative: Using Docker Directly
To build the Docker image locally:

```bash
docker build -t playwright-tests .
```

### Run Tests in Docker
To run all tests in Docker:

```bash
docker run --rm -v $(pwd)/allure-results:/app/allure-results playwright-tests:latest
```

This command:
- Uses the `--rm` flag to automatically remove the container when it exits
- Mounts the local `allure-results` directory to collect test reports
- Uses the latest version of our Playwright tests image

### View Test Results
After running tests in Docker, you can generate the Allure report locally:

```bash
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

## **Project Structure**

```plaintext
techtask/
├── data/
│   └── localStorage.ts         # Local storage data for tests
├── pages/
│   ├── home.page.ts            # Page Object Model for the home page
│   ├── search.page.ts          # Page Object Model for the search page
│   └── releaseNotes.page.ts    # Page Object Model for the release notes page
├── tests/
│   ├── goToGithub.spec.ts      # Test for navigating to GitHub
│   ├── searchTC1E2E.spec.ts    # Test for search flow using POM
│   ├── searchTC2addFavorites.spec.ts # Test for adding search queries to favorites
│   ├── snapshot.spec.ts        # Snapshot testing examples
│   └── searchTC3RemoveFromFavorites.spec.ts # Test for removing search queries from favorites
│   └── searchTC4RemoveQuerryFromRecent.spec.ts # Test for removing search queries from recent searches
├── utils/
│   └── localStorageUtils.ts    # Utility functions for managing local storage
├── [playwright.config.ts]      # Playwright configuration file
├── [package.json]              # Project dependencies and scripts
├── [package-lock.json]         # Dependency lock file
└── [README.MD]                 # Project documentation
```

## **Implemented Logic**

1. **Page Object Model (POM)**
   The project uses the POM design pattern to encapsulate page-specific logic and locators in separate classes.
   Example:
   - `home.page.ts`: Contains methods to interact with the home page.
   - `search.page.ts`: Contains methods to interact with the search page.

2. **Local Storage Management**
   Local storage data is stored in `data/localStorage.ts`.
   Utility functions in `utils/localStorageUtils.ts` are used to set local storage keys and values dynamically during tests.

3. **Test Cases**
   - `goToGithub.spec.ts`: Verifies navigation to the GitHub repository link.
   - `goToDiscord.spec.ts`: Verifies navigation to the Discord repository link.
   - `searchTC1E2E.spec.ts`: Tests the end-to-end search flow.
   - `searchTC2addFavorites.spec.ts`: Adding a Search Query to Favorites
   - `searchTC3RemoveFromFavorites.spec.ts`: Removing a Search Query from Favorites
   - `searchTC4RemoveQuerryFromRecent.spec.ts`: Removing a Search Query from Recent Searches
