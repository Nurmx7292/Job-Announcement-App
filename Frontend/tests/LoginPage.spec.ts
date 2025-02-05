import { test, expect } from "@playwright/test";

// test.describe("Login page", () => {
//     test("Login page loads correctly", async ({ page }) => {
//         await page.goto("http://localhost:5173/login");

//         // Check page title
//         await expect(page).toHaveTitle(/Vite/i);

//         // Check if the login heading is visible
//         await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

//         // Check if email and password inputs exist
//         await expect(page.getByPlaceholder("Email")).toBeVisible();
//         await expect(page.getByPlaceholder("Password")).toBeVisible();

//         // Check if login button is visible
//         await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
//     });
// });

test.describe("Login page", () => {
    test("Login form  submission", async ({ page }) => {
        await page.goto("http://localhost:5173/login");
        await page.getByPlaceholder("Email").fill("test@example.com");
        await page.getByPlaceholder("Password").fill("password123");

        await page.route("http://54.165.132.132:3000/api/user/login", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    username: "testUser",
                    email: "test@example.com",
                    accessToken: "mockToken123",
                    role: "user",
                    userId: "12345",
                }),
            });
        });
        await page.getByRole("button", { name: "Log in" }).click();

        // Verify redirection to homepage
        await expect(page).toHaveURL("http://localhost:5173/");
    });
});
