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


Install dependencies

npm install

Running Tests

Run All Tests
To execute all tests in the project:

npx playwright test

Run a Specific Test
To run a specific test file:
npx playwright test tests/searchTC1E2E.spec.ts

Run Tests in Debug Mode
To debug tests interactively:

npx playwright test --debug

Run Tests in Headed Mode
To run tests with a visible browser window:

npx playwright test --headed

Run test in ui mode

npx playwright test --ui


Generate an HTML Report
To generate a test report:

npx playwright test --reporter=html

The report will be available in the playwright-report directory.

techtask/
├── data/
│   └── localStorage.ts         # Local storage data for tests
├── pages/
│   ├── home.page.ts            # Page Object Model for the home page
│   ├── search.page.ts          # Page Object Model for the search page
│   └── releaseNotes.page.ts    # Page Object Model for the release notes page
├── tests/
│   ├── goToGithub.spec.ts      # Test for navigating to GitHub
│   ├── searchTC1E2E.spec.ts # Test for search flow using POM
│   └── searchTC2addFavorites.spec.ts # Test for adding search queries to favorites
├── utils/
│   └── localStorageUtils.ts    # Utility functions for managing local storage
├── [playwright.config.ts]      # Playwright configuration file
├── [package.json]              # Project dependencies and scripts
├── [package-lock.json]         # Dependency lock file
└── [README.MD]                # Project documentation

Implemented Logic

1. Page Object Model (POM)
The project uses the POM design pattern to encapsulate page-specific logic and locators in separate classes.
Example:
home.page.ts: Contains methods to interact with the home page.
search.page.ts: Contains methods to interact with the search page.
1. Local Storage Management
Local storage data is stored in data/localStorage.ts.
Utility functions in utils/localStorageUtils.ts are used to set local storage keys and values dynamically during tests.
1. Test Cases
goToGithub.spec.ts:
Verifies navigation to the GitHub repository link.
goToDiscord.spec.ts:
Verifies navigation to the Dicord repository link.
searchTC1E2E.spec.ts.spec.ts:
Tests the end-to-end search flow.
searchTC2addFavorites.spec.ts
Adding a Search Query to Favorites
searchTC3RemoveFromFavorites.spec.ts
Removing a Search Query from Favorites
searchTC4RemoveQuerryFromRecent.spec.ts
Removing a Search Query from Recent Searches
