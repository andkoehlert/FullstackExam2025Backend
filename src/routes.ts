import express, { Router, Request, Response } from 'express';

import { 
    createProduct, 
    deleteProductById, 
    getAllProducts, 
    getProductById, 
    updateProductById } from './controller/productController';

import { 
    createProject, 
    getAllProjects, 
    deleteProjectById,
    getProjectById,
    getStatusProject, 
    updateProjectById, } from './controller/projectController';
    
import { 
    createEmployee, 
    getAllEmployees, 
    updateEmployeeById, 
    deleteEmployeeById, 
    getEmployeeById } from './controller/employeeController'

import {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    updatePostById } from './controller/post'

import { 
    createTask, 
    getAllTasks,
    deleteTaskById,
    getTaskById,
    updateTaskById } from './controller/taskController';

import {uploadImage} from './controller/uploadImage'
import {upload} from './middlewares/multer'
import { loginUser, registerUser, verifyToken } from './controller/authController';

const router: Router = Router();




/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server up and running.
 */

// get, post, put, delete

router.get('/', (req: Request, res: Response) => {
    res.status(200).send({message: 'Hello & welcome'});
});

router.post('/upload', upload.single('image'), uploadImage);

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Product Routes
 *     summary: Create a new Product
 *     description: Create a new Product
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *           example:
 *             name: "Steel2"
 *             description: "Something something"
 *             imageURL: "https://random-d.uk/api/v2/randomimg"
 *             category: Steel
 *             quantity: 3
 *             stock: 3
 *             supplier: "something something"
 *             orderDate:  "2025-04-07"
 *             arrivalDate: "2025-04-12"        
 *             _createdBy: "67f398160b555c054a93cc91"
 *     responses:
 *       201:
 *         description: Product created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
// When we access products endpoint it will fire the 'creteProduct' from the controller.
router.post('/products',  createProduct);

// createEmployee
router.post('/employee', verifyToken, createEmployee);
/**
 * @swagger
 * /employee:
 *   post:
 *     tags:
 *       - Employee Routes
 *     summary: Create a new Employee
 *     description: Create a new Employee
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *           example:
 *             name: "Alice Johnson"
 *             position: "Software Engineer"
 *             description: "Experienced backend developer."
 *             email: "alice.johnson@example.com"
 *             profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
 *             bio: "Alice has over 10 years of experience in full-stack development."
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */

router.post('/tasks', createTask);

// createPost
router.post('/post', verifyToken, createPost);
/**
 * @swagger
 * /post:
 *   post:
 *     tags:
 *       - Post Routes
 *     summary: Create a new Post
 *     description: Create a new Post
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *           example:
 *             title: "Weekly Update"
 *             content: "Here's what we accomplished this week..."
 *             authorId: "67f398160b555c054a93cc91"
 *             createdAt: "2025-05-10T10:30:00.000Z"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 */



/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - Project Routes
 *     summary: Create a new project
 *     description: Create a new project
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *           example:
 *             name: "Steel2"
 *             description: "Something something"
 *             imageURL: "https://random-d.uk/api/v2/randomimg"
 *             category: Steel
 *             quantity: 3
 *             stock: 3
 *             supplier: "something something"
 *             orderDate:  "2025-04-07"
 *             arrivalDate: "2025-04-12"        
 *             _createdBy: "67f398160b555c054a93cc91"
 *     responses:
 *       201:
 *         description: Project created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 */
// When we access products endpoint it will fire the 'createProject' from the controller.
router.post('/projects',  createProject);





/**
* @swagger
* /products:
*   get:
*     tags:
*       - Product Routes
*     summary: Retrieves a list of Products
*     description: Retrieves a list of products as JSON objects.
*     responses:
*       200:
*         description: A list of product JSON objects in an array.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: "#/components/schemas/Product"
*/
router.get('/products', getAllProducts);


// get all employees
/**
 * @swagger
 * /employees:
 *   get:
 *     tags:
 *       - Employee Routes
 *     summary: Get all employees
 *     description: Retrieve a list of all employees
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: "#/components/schemas/Employees"
 */
router.get('/employees', getAllEmployees);

router.get('/tasks', getAllTasks);

// get all Post
/**
 * @swagger
 * /posts:
 *   get:
 *     tags:
 *       - Post Routes
 *     summary: Get all posts
 *     description: Retrieve a list of all posts
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Post"
 */

router.get('/posts', getAllPosts);

/**
* @swagger
* /Projects:
*   get:
*     tags:
*       - Project Routes
*     summary: Retrieves a list of Project
*     description: Retrieves a list of Project as JSON objects.
*     responses:
*       200:
*         description: A list of Project JSON objects in an array.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: "#/components/schemas/Project"
*/


router.get('/projects', getAllProjects);


/**
 * @swagger
 * /projects/status/{status}:
 *   get:
 *     tags:
 *       - Project Routes
 *     summary: Get projects by status
 *     description: Returns projects filtered by their status.
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: Status to filter projects by
 *         schema:
 *           type: string
 *           enum: [not-started, in-progress, completed, delayed]
 *     responses:
 *       200:
 *         description: A list of projects with the given status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Project"
 */

router.get('/projects/status/:status', getStatusProject);





// The :id is now available in the URL

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Specific products
 *     description: Retrieves a specific products based on it id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A products in the format of a JSON object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products/:id', getProductById);

router.get('/tasks/:id', getTaskById);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     tags:
 *       - Employee Routes
 *     summary: Get a specific employee
 *     description: Retrieves a specific employee by their MongoDB ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the employee
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An employee in the format of a JSON object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 *       404:
 *         description: Employee not found
 */

router.get('/employees/:id', getEmployeeById);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Post Routes
 *     summary: Get a specific post
 *     description: Retrieves a specific post by its MongoDB ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A post in the format of a JSON object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 *       404:
 *         description: Post not found
 */

router.get('/posts/:id', getPostById);


// The :id is now available in the URL

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Project Routes
 *     summary: Specific project
 *     description: Retrieves a specific projects based on it id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A projects in the format of a JSON object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Projects"
 */
router.get('/projects/:id', getProjectById);

// update and delete



/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Product Routes
 *     summary: Updates a specific Product
 *     description: Updates a specific Product based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *
 *     responses:
 *       200:
 *         description: Product updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.put('/products/:id', verifyToken, updateProductById)

router.put('/tasks/:id', updateTaskById);


/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags:
 *       - Post Routes
 *     summary: Updates a specific Post
 *     description: Updates a specific Post based on its ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 */

router.put('/posts/:id', verifyToken, updatePostById)
/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     tags:
 *       - Employee Routes
 *     summary: Updates a specific Employee
 *     description: Updates a specific Employee based on its ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the employee
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */

router.put('/employees/:id', verifyToken, updateEmployeeById)


/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     tags:
 *       - Project Routes
 *     summary: Updates a specific Project
 *     description: Updates a specific Project based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *
 *     responses:
 *       200:
 *         description: Project updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 */
router.put('/projects/:id', verifyToken, updateProjectById)


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Product Routes
 *     summary: Deletes a specific product
 *     description: Deletes a specific product based on it id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *
 *     responses:
 *       201:
 *         description: product deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */

router.delete('/products/:id', verifyToken, deleteProductById)


router.delete('/tasks/:id', deleteTaskById);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     tags:
 *       - Post Routes
 *     summary: Deletes a specific post
 *     description: Deletes a specific post based on its ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 *       404:
 *         description: Post not found
 */

router.delete('/post/:id', verifyToken, deletePostById)
/**
 * @swagger
 * /Employees/{id}:
 *   delete:
 *     tags:
 *       - Employee Routes
 *     summary: Deletes a specific employee
 *     description: Deletes a specific employee based on its ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the employee
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 *       404:
 *         description: Employee not found
 */

router.delete('/Employees/:id', verifyToken, deleteEmployeeById)




/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - Project Routes
 *     summary: Deletes a specific project
 *     description: Deletes a specific project based on it id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *
 *     responses:
 *       201:
 *         description: project deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 */
router.delete('/projects/:id', verifyToken, deleteProjectById)



// auth
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
// auth
router.post('/user/register', registerUser)
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Log in a user
 *     description: Authenticates a user and returns a JWT token if credentials are valid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourSecurePassword
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           auth-token:
 *             schema:
 *               type: string
 *             description: JWT token for authenticated requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email or password is wrong"
 *       500:
 *         description: Server error
 */

router.post('/user/login', loginUser )

export default router