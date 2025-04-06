import {test, expect} from "@playwright/test"


export default function productCreateCollection() {
  
  
  test("Workflow - register, login, create product and verify", async ({ request }) => {

    test.setTimeout(30_000);

    //------------------------------------------------------------------------------
    // Create test objects
    //------------------------------------------------------------------------------
    const userReg = {
        name: "Lars Larsen",
        email: "mail@larsen2.com",
        password: "12345678"
    }

    const userLogin = {
        email: "mail@larsen2.com",
        password: "12345678"
    }


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
    const checkProduct = {
      
        "name": "steel plate",
        "description": "The best something",
        "imageURL": "https://picsum.photos/500/500",
        "category": "steel",
        "quantity": 20,
        "stock": 10,
        "supplier": "something",
        "orderDate": 20,
        "arrivalDate": 20,
        "_createdBy": userId
        
    }
     response = await request.post("/api/products", { 
      
      data: checkProduct,
        headers: {
            "auth-token": token,
        }
       });
  


    // Assert
    expect(response.status()).toBe(201);
   
  })}
