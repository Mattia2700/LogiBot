import {Router} from "express";
import orderController from "../controller/order";

const router = Router();

// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });

router.post('/order', orderController.create as any);
router.get('/order', orderController.read as any);

export default router;