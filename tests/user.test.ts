import {test, expect} from "@playwright/test"


export default function userTestCollection() {
  test("Valid user registration info", async ({ request }) => {

    test.setTimeout(10_000);

    // Arrange
    const user = {
      name: "Lars Larsen",
      email: "mail@larsen.com",
      password: "123456"
    }

    // Act
    const response = await request.post("/api/user/register", { data: user });
    const json = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(json.error).toEqual(null);
  })}
