import {Router, Request, Response} from 'express';
import { createProduct, 
    deleteProductById, 
    getAllProducts, 
    getProductById, 
    updateProductById } from './controller/productController';
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
// The :id is now available in the URL
router.get('/products/:id', getProductById);

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
router.delete('/products/:id', verifyToken, deleteProductById)



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