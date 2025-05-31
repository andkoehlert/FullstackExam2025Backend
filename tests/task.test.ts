import { test, expect } from "@playwright/test";

export default function taskCreateCollection() {
  test("Workflow - register, login, create task, update task status", async ({ request }) => {
    test.setTimeout(30_000);

    const random = Math.floor(Math.random() * 1000000);
    const email = `taskuser${random}@test.com`;

    const user = {
      name: "Task Tester",
      email,
      password: "12345678"
    };

    let response = await request.post("/api/user/register", { data: user });
    expect(response.status()).toBe(200);

    response = await request.post("/api/user/login", {
      data: { email, password: user.password }
    });

    const loginData = await response.json();
    const token = loginData.data.token;
    const userId = loginData.data.userId;

    expect(token).toBeTruthy();
    expect(userId).toBeTruthy();

    const task = {
      name: "Write unit tests",
      status: "todo", 
      _createdBy: userId
    };

    response = await request.post("/api/tasks", {
      data: task,
      headers: { "auth-token": token }
    });

    expect(response.status()).toBe(201);

    const createdTask = await response.json();
    expect(createdTask.name).toBe(task.name);
    expect(createdTask.status).toBe("todo");

    const taskId = createdTask._id;

    // This is like drag and drop in my frontend
    const update = {
      status: "inProgress"
    };

    response = await request.put(`/api/tasks/${taskId}`, {
      data: update,
      headers: { "auth-token": token }
    });

    expect(response.status()).toBe(200);

    // Fetch the updated task and check status
    response = await request.get(`/api/tasks/${taskId}`, {
      headers: { "auth-token": token }
    });

    expect(response.status()).toBe(200);
    const fetched = await response.json();
    expect(fetched.status).toBe("inProgress");
  });
}
