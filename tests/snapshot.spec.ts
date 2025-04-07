import {test, expect} from '@playwright/test';
/*
Snapshot testing is ideal for:
UI testing of whole pages and components.
Broad structural checks for complex UI components.
Regression testing for outputs that rarely change structure.
*/
test.describe('Snapshot testing examples and how to use ', async () => {
    test('New snapshot testing via playwright.dev ', async ({page}) => {
        await page.goto('https://playwright.dev/');
        await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - banner:
      - heading "Playwright enables reliable end-to-end testing for modern web apps." [level=1]
      - link "Get started"
      - link "Star microsoft/playwright on GitHub"
      - link /[\\d,.]+[bkmBKM]+\\+ stargazers on GitHub/
    `);
    });

    test('New snapshow of mainpage ', async ({page}) => {
        await page.goto('https://playwright.dev/');

        await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - img "Browsers (Chromium, Firefox, WebKit)"
      - heading "Any browser • Any platform • One API" [level=3]
      - paragraph: Cross-browser. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.
      - paragraph: Cross-platform. Test on Windows, Linux, and macOS, locally or on CI, headless or headed.
      - paragraph:
        - text: Cross-language. Use the Playwright API in
        - link "TypeScript"
        - text: ","
        - link "JavaScript"
        - text: ","
        - link "Python"
        - text: ","
        - link ".NET"
        - text: ","
        - link "Java"
        - text: .
      - paragraph: Test Mobile Web. Native mobile emulation of Google Chrome for Android and Mobile Safari. The same rendering engine works on your Desktop and in the Cloud.
      - heading [level=3]
      - heading [level=3]
      - heading "Resilient • No flaky tests" [level=3]
      - paragraph: Auto-wait. Playwright waits for elements to be actionable prior to performing actions. It also has a rich set of introspection events. The combination of the two eliminates the need for artificial timeouts - the primary cause of flaky tests.
      - paragraph: Web-first assertions. Playwright assertions are created specifically for the dynamic web. Checks are automatically retried until the necessary conditions are met.
      - paragraph: Tracing. Configure test retry strategy, capture execution trace, videos, screenshots to eliminate flakes.
      - heading "No trade-offs • No limits" [level=3]
      - paragraph: Browsers run web content belonging to different origins in different processes. Playwright is aligned with the modern browsers architecture and runs tests out-of-process. This makes Playwright free of the typical in-process test runner limitations.
      - paragraph: Multiple everything. Test scenarios that span multiple tabs, multiple origins and multiple users. Create scenarios with different contexts for different users and run them against your server, all in one test.
      - paragraph: Trusted events. Hover elements, interact with dynamic controls, produce trusted events. Playwright uses real browser input pipeline indistinguishable from the real user.
      - paragraph: Test frames, pierce Shadow DOM. Playwright selectors pierce shadow DOM and allow entering frames seamlessly.
      - heading [level=3]
      - heading [level=3]
      - heading "Full isolation • Fast execution" [level=3]
      - paragraph: Browser contexts. Playwright creates a browser context for each test. Browser context is equivalent to a brand new browser profile. This delivers full test isolation with zero overhead. Creating a new browser context only takes a handful of milliseconds.
      - paragraph: Log in once. Save the authentication state of the context and reuse it in all the tests. This bypasses repetitive log-in operations in each test, yet delivers full isolation of independent tests.
      - heading "Powerful Tooling" [level=3]
      - paragraph:
        - link "Codegen."
        - text: Generate tests by recording your actions. Save them into any language.
      - paragraph:
        - link "Playwright inspector."
        - text: Inspect page, generate selectors, step through the test execution, see click points, explore execution logs.
      - paragraph:
        - link "Trace Viewer."
        - text: Capture all the information to investigate the test failure. Playwright trace contains test execution screencast, live DOM snapshots, action explorer, test source, and many more.
      - heading "Chosen by companies and open source projects" [level=2]
      - list:
        - listitem:
          - link "VS Code":
            - img "VS Code"
        - listitem:
          - link "Bing":
            - img "Bing"
        - listitem:
          - link "Outlook":
            - img "Outlook"
        - listitem:
          - link "Disney+ Hotstar":
            - img "Disney+ Hotstar"
        - listitem:
          - link "Material UI":
            - img "Material UI"
        - listitem:
          - link "ING":
            - img "ING"
        - listitem:
          - link "Adobe":
            - img "Adobe"
        - listitem:
          - link "React Navigation":
            - img "React Navigation"
        - listitem:
          - link "Accessibility Insights":
            - img "Accessibility Insights"
    `);
    });
});
