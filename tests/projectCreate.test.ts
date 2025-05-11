import { test, expect } from "@playwright/test";

interface Project {
  name: string;
  description: string;
  lokation: string;
  startDate: string;
  endDate: string;
  status: string;
  contract: string;
  _createdBy: string;
  products: { productId: string, quantity: number, _id: string }[];
  employees: { employeeId: string }[];
}

export default function projectCreateCollection() {
  test("Project filter by status", async ({ request }) => {
    test.setTimeout(30_000);

    const random = Math.floor(Math.random() * 1000000);
    const email = `testuser${random}@project.com`;

    const userReg = {
      name: "Test User",
      email,
      password: "12345678"
    };

    const userLogin = {
      email,
      password: "12345678"
    };

    // Register user
    let response = await request.post("/api/user/register", { data: userReg });
    expect(response.status()).toBe(200);

    // Login
    response = await request.post("/api/user/login", { data: userLogin });
    const json = await response.json();
    const token = json.data.token;
    const userId = json.data.userId;

    // Create project with status "completed"
    const completedProject = {
      employees: [],
      name: "andreas",
      description: "The best something",
      lokation: "https://picsum.photos/500/500",
      startDate: "2025-10-20T00:00:00.000Z",
      endDate: "2026-10-20T00:00:00.000Z",
      status: "completed",
      price: 500,
      totalPrice: 0,
      contract: "something",
      __v: 0,
      products: [],
      _createdBy: userId
    };

    response = await request.post("/api/projects", {
      data: completedProject,
      headers: { "auth-token": token }
    });
    expect(response.status()).toBe(201);

    // Create project with status "delayed"
    const delayedProject = {
      ...completedProject,
      name: "Test Project Delayed",
      status: "delayed"
    };

    response = await request.post("/api/projects", {
      data: delayedProject,
      headers: { "auth-token": token }
    });

    console.log('Response Body:', await response.text());  // Log the body for more details

    expect(response.status()).toBe(201);

    // Collect the projects with status = completed
    response = await request.get("/api/projects/status/completed", {
      headers: { "auth-token": token }
    });
    expect(response.status()).toBe(200);

    const projects: Project[] = await response.json();

    // Check if it's an array
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThanOrEqual(1);

    // Ensure all projects are completed
    const allAreCompleted = projects.every(project => project.status === "completed");
    expect(allAreCompleted).toBe(true);

    // Collect the projects with status = delayed
    response = await request.get("/api/projects/status/delayed", {
      headers: { "auth-token": token }
    });
    expect(response.status()).toBe(200);

    const delayedProjects: Project[] = await response.json();

    // Check if it's an array
    expect(Array.isArray(delayedProjects)).toBe(true);
    expect(delayedProjects.length).toBeGreaterThanOrEqual(1);

    // Ensure all projects are delayed
    const allAreDelayed = delayedProjects.every(project => project.status === "delayed");
    expect(allAreDelayed).toBe(true);
  });
}
