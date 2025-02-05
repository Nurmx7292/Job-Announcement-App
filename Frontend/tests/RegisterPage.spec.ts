import { test, expect } from "@playwright/test";

test.describe("SignUp Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5173/sign-in");
    });

    test("Страница регистрации загружается корректно", async ({ page }) => {
        await expect(page).toHaveTitle(/Vite/i);
        await expect(page.getByRole("heading", { name: "Registration" })).toBeVisible();
        await expect(page.getByPlaceholder("Name")).toBeVisible();
        await expect(page.getByPlaceholder("Email")).toBeVisible();
        await expect(page.getByPlaceholder("Password")).toBeVisible();
        await expect(page.getByRole("button", { name: "Register" })).toBeVisible();
    });

    test("Успешная регистрация", async ({ page }) => {
        await page.route("http://54.165.132.132:3000/api/user/register", async (route) => {
            await route.fulfill({
                status: 201,
                contentType: "application/json",
                body: JSON.stringify({
                    username: "testUser",
                    email: "test@example.com",
                }),
            });
        });

        page.on("dialog", (dialog) => {
            expect(dialog.message()).toBe("Регистрация успешна!");
        });

        await page.getByPlaceholder("Name").fill("testUser");
        await page.getByPlaceholder("Email").fill("test@example.com");
        await page.getByPlaceholder("Password").fill("password123");
        await page.getByRole("button", { name: "Register" }).click();
    });
});
