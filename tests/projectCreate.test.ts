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
const product = {
  name: "Test Product",
  stock: 10
 
};
response = await request.post("/api/products", {
  data: product,
  headers: { "auth-token": token }
});

expect(response.status()).toBe(201);
const createdProduct = await response.json();

// Create employee
const employee = {
  name: "Test Employee",
  position: "Developer"
};
response = await request.post("/api/employees", {
  data: employee,
  headers: { "auth-token": token }
});

expect(response.status()).toBe(201);
const createdEmployee = await response.json();



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
    products: [{ productId: createdProduct._id, quantity: 1 }],
employees: [{ employeeId: createdEmployee._id }]

  };

  response = await request.post("/api/projects", {
    data: completedProject,
    headers: { "auth-token": token }
  });
  expect(response.status()).toBe(201);

  // Opret projekt med status "delayed"
  // Using Spread Operator to copy completedProject
  // and overriding the name and status
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

  // New constant that holds the json-data from the response
  // This would be an array
  // Using my interface Project
  const projects: Project[] = await response.json();

  // Checking if it is an array
  expect(Array.isArray(projects)).toBe(true);
  // checking if there is atleast 1 project in the array
  expect(projects.length).toBeGreaterThanOrEqual(1);

  // Using the every() method of an Array instances to test whether all elements in the array pass the test
  
  const allAreCompleted = projects.every(project => project.status === "completed");
  // every() returns a Boolean value
  expect(allAreCompleted).toBe(true);
})};
