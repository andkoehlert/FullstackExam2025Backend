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
  products: { productId: string, quantity: number, _id: string }[];  // Ensure the _id is included here
  employees: { employeeId: string }[];  // Just employeeId here
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

    // Create product
    const productData = {
      name: "Product 1",
      price: 100,
      description: "A sample product",
      supplier: "Supplier 1",
      quantity: 10,
      category: "Category 1",
      imageURL: "http://image.url",
      _createdBy: userId
    };

    response = await request.post("/api/products", {
      data: productData,
      headers: { "auth-token": token }
    });

    expect(response.status()).toBe(201);
    const createdProduct = await response.json();
    const productId = createdProduct._id;  

    // Create employee
    const employeeData = {
      name: "John Doe",
      role: "Developer",
      department: "Engineering"
    };

    response = await request.post("/api/employees", {
      data: employeeData,
      headers: { "auth-token": token }
    });

    expect(response.status()).toBe(201);
    const createdEmployee = await response.json();
    const employeeId = createdEmployee._id;  

    // Creating project with status "completed"
    const completedProject = {
      name: "Test Project Completed",
      description: "A completed test project",
      lokation: "https://picsum.photos/500/500",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      status: "completed",
      contract: "test contract",
      _createdBy: userId,
      products: [
        { 
          productId: productId, 
          quantity: 1, 
          _id: createdProduct._id 
        }
      ],
      employees: [
        { employeeId: employeeId }  
      ]
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
  });
}
