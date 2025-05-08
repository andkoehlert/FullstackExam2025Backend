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
    
    import { createEmployee, getAllEmployees, updateEmployeeById, deleteEmployeeById, getEmployeeById } from './controller/employeeController'
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
router.post('/employee',  createEmployee);



/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - project Routes
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
router.get('/employees', getAllEmployees);


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

router.get('/employees/:id', getEmployeeById);


// The :id is now available in the URL

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects Routes
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
 *       - product Routes
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

router.delete('/Employees/:id', verifyToken, deleteEmployeeById)



/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - product Routes
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
router.post('/user/login', loginUser )

export default router