import express from 'express';
import { addOrder, getAllOrder, getOrderDetail, getOrderUser } from '../Controllers/orderController.js';
import { userCheck, adminCheck } from '../middleware/authCheck.js';



const router = express.Router();

router.route('/').get(userCheck, adminCheck, getAllOrder).post(userCheck, addOrder);

router.route('/users').get(userCheck, getOrderUser)

router.route('/users/:id').get(userCheck, getOrderDetail);
export default router;
