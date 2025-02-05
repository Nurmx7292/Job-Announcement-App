import { test, expect } from "@playwright/test";

test.describe("Job Posting", () => {
    test.beforeEach(async ({ page, context }) => {
        await context.addInitScript(() => {
            localStorage.setItem(
                "accessToken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2EwZGY4YTY1NzUzOGE2YmU0MDRjNjIiLCJlbWFpbCI6InJha2htZXRAbWFpbC5ydSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODc0NDgxMSwiZXhwIjoxNzM4NzQ2NjExfQ._pYjDONZE4dnXwOsFV9RqNPHRgOxas-ok9q6xpffzIM"
            );
        });
        await page.goto("http://localhost:5173/post");
    });

    test("User can fill out and submit the job post form", async ({ page }) => {
        await expect(page.getByRole("heading", { level: 2 })).toContainText("Create a Job Listing");
        await page.fill('input[name="title"]', "Software Engineer");
        await page.fill('input[name="company"]', "TechCorp");
        await page.fill('textarea[name="description"]', "Exciting opportunity to work on cutting-edge tech.");
        await page.fill('input[name="location"]', "New York");
        await page.fill('input[name="salary"]', "120000");
        await page.selectOption('select[name="category"]', "Engineering");
        await page.fill('input[name="requirements"]', "Experience in JavaScript and React");

        // Ensure you have a test image in the tests folder
        const inputFile = page.locator('input[type="file"]');
        await inputFile.setInputFiles("tests/test-image.png"); // Ensure this file exists

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL("http://localhost:5173/"); // Redirects to homepage after successful submission
    });
});
