import express from 'express';

import { createProduct, getProduct, getProducts, getTopProducts, removeProduct, updateProduct } from '../Controllers/productController.js';
import { adminCheck, userCheck } from '../middleware/authCheck.js';
import { fileCheck, updateFileCheck } from '../middleware/filecheck.js';


const router = express.Router();

router.route('/').get(getProducts).post(userCheck, adminCheck,
  fileCheck, createProduct);

router.route('/top-5-products').get(getTopProducts, getProducts);

router.route('/:id').get(getProduct).patch(userCheck, adminCheck, updateFileCheck, updateProduct).delete(removeProduct);

export default router;

















// // all_products             /products
// // mobile_products
// // kitechen_products
// // create_products
// import express from 'express';
// import { getAllProducts } from '../controllers/productController.js';

// const router = express.Router();

// router.route('/products').get(getAllProducts) //.post(createProducts);
// //or//router.route('/products').get((req, res) => getAllProducts(req, res));

// // router.route('/products/:id').get().patch().delete();

// export default router;