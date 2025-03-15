import {Router, Request, Response} from 'express';

const router: Router = Router();


// get, post, put, delete (crud)

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the site');
});

export default router