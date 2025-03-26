import {Router, Request, Response} from 'express';
import { createProduct, 
    deleteProductById, 
    getAllProducts, 
    getProductById, 
    updateProductById } from './controller/productController';
import { loginUser, registerUser, verifyToken } from './controller/authController';

const router: Router = Router();




// get, post, put, delete (crud)

router.get('/', (req: Request, res: Response) => {
    res.status(200).send({message: 'Hello & welcome'});
});

// When we access products endpoint it will fire the 'creteProduct' from the controller.
router.post('/products', createProduct);

router.get('/products', getAllProducts);
// The :id is now available in the URL
router.get('/products/:id', getProductById);

// update and delete
router.put('/products/:id', updateProductById)
router.delete('/products/:id', verifyToken, deleteProductById)

// auth
router.post('/user/register', registerUser)
router.post('/user/login', loginUser )

export default router