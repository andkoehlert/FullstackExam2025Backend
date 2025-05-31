import {test, expect} from "@playwright/test"


export default function employeeCreateCollection() {
  
  
  test("Workflow - register, login, create emoloyee and verify", async ({ request }) => {

    test.setTimeout(30_000);

    //------------------------------------------------------------------------------
    // Create test objects
    //------------------------------------------------------------------------------
    const random = Math.floor(Math.random() * 1000000); 
    const email = `testuser${random}@larsen.com`;


    const userReg = {
        name: "Lars Larsen",
        email,
        password: "12345678"
      };
      
      const userLogin = {
        email,
        password: "12345678"
      };
        //------------------------------------------------------------------------------
        // Register user
        //------------------------------------------------------------------------------
        let response = await request.post("/api/user/register", { data: userReg });
        
        let json = await response.json();

        if (response.status() !== 200) {
            const errorText = await response.text();
            console.error("Register failed:", errorText);
          }

       
        expect(response.status()).toBe(200);
        //------------------------------------------------------------------------------
        // Login user
        //------------------------------------------------------------------------------
        response = await request.post("/api/user/login", { data: userLogin });

        try {
            json = await response.json();

        } catch (err) {
            const text = await response.text();
            console.error("Login response not json:", text)
            throw new Error("Login response is not vaild JSON");
        }

        if (!json.data?.token) {
            console.error("Login JSON missing token:", json)
            throw new Error("No token returned from login");
        }

        const token = json.data.token;
        const userId = json.data.userId;
        expect(response.status()).toBe(200);


    // Arrange
    const checkEmployee = {
      
        "name": "Peter parker",
        "description": "Working as something",
        "profileImage": "https://picsum.photos/500/500",
        "position": "Chef",
        "email": "testuser@larsen.com",
        "bio": 'Something',
        
    }
     response = await request.post("/api/employee", { 
      
      data: checkEmployee,
        headers: {
            "auth-token": token,
        }
       });
  


    // Assert
    expect(response.status()).toBe(201);
   
  })}
