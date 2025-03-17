import {Router, Request, Response} from 'express';
import { createProduct, 
    deleteProductById, 
    getAllProducts, 
    getProductById, 
    updateProductById } from './controller/productController';

const router: Router = Router();




// get, post, put, delete (crud)

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the site');
});

// When we access products endpoint it will fire the 'creteProduct' from the controller.
router.post('/products', createProduct);

router.get('/products', getAllProducts);
// The :id is now available in the URL
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById)
router.delete('/products/:id', deleteProductById)


export default router