import {Router} from "express";
import orderController from "../controller/order";
import gruber from "../controller/gruber";

const router = Router();

// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });

router.post('/order', orderController.create as any);
router.get('/order', orderController.read as any);
router.get('/order/:id', orderController.readById as any);

router.get('/chats', gruber.get_chats as any);
router.get('/chat/:id', gruber.get_chats_by_id as any);
router.get('/candidate_deals', gruber.get_deals as any);

router.post('/message', gruber.new_message as any);


export default router;