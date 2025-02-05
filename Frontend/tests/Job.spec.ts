import { test, expect } from "@playwright/test";

test.describe("Job Component", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5173");
    });

    test("Job component displays job details correctly", async ({ page }) => {
        // Check if the job title is visible

        const jobTitle = page.locator("h2").first(); // Use first() to select the first h2 element

        await expect(jobTitle).toHaveText("jkjjjjjjjjj");

        const jobDescription = page.locator("p").first();

        await expect(jobDescription).toHaveText("ffffffffffff");
    });
});
