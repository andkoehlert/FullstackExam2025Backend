import { test, expect } from "@playwright/test";

export default function postCreateCollection() {
  test("Workflow - register, login, create post and verify", async ({ request }) => {
    test.setTimeout(30_000);

    const random = Math.floor(Math.random() * 1000000);
    const email = `testuser${random}@example.com`;

    const userReg = {
      name: "Post Tester",
      email,
      password: "12345678",
    };

    const userLogin = {
      email,
      password: "12345678",
    };

    let response = await request.post("/api/user/register", { data: userReg });

    expect(response.status()).toBe(200);

    response = await request.post("/api/user/login", { data: userLogin });

    let json;
    try {
      json = await response.json();
    } catch (err) {
      const text = await response.text();
      console.error("Login response not JSON:", text);
      throw new Error("Login response is not valid JSON");
    }

    if (!json.data?.token || !json.data?.userId) {
      throw new Error("Login failed to return token or userId");
    }

    const token = json.data.token;
    const userId = json.data.userId;

    expect(response.status()).toBe(200);

    const postData = {
      title: "Test Post Title",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "This is a post created in a test." },
            ],
          },
        ],
      },
      authorId: userId,
    };

    response = await request.post("/api/post", {
      data: postData,
      headers: {
        "auth-token": token,
      },
    });

    expect(response.status()).toBe(201);

    const postResponse = await response.json();

    expect(postResponse.title).toBe(postData.title);
    expect(postResponse.authorId).toBe(userId);
    expect(postResponse.content).toMatchObject(postData.content);
  });
}
