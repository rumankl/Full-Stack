import Product from "../models/Product.js"
import fs from 'fs';
import mongoose from "mongoose";


export const getTopProducts = (req, res, next) => {

  req.query.rating = { gt: 4.7 };
  req.query.limit = 5;
  next();

}


export const getProducts = async (req, res) => {
  // console.log(req.cookies);
  try {

    // search , sort, fields, operator, limit, page , skip

    const excludesFields = ['sort', 'search', 'limit', 'fields', 'skip', 'page'];

    const queryObj = { ...req.query };


    excludesFields.forEach((label) => delete queryObj[label]);

    if (req.query.search) {
      queryObj.title = { $regex: req.query.search, $options: 'i' }
      // queryObj.brand = { $regex: req.query.search, $options: 'i' }
    }


    let qStr = JSON.stringify(queryObj);

    // console.log(qStr);

    qStr = qStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);


    let query = Product.find(JSON.parse(qStr));


    if (req.query.sort) {
      const filterSorts = req.query.sort?.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.sort(filterSorts);

    }

    if (req.query.fields) {
      const filterFlelds = req.query.fields?.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.select(filterFlelds);

    }


    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const response = await query.skip(skip).limit(limit);

    return res.status(200).json({ length: response.length, products: response });
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
}


export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'product not found' });
    const product = await Product.findById(id);
    return res.status(200).json(product);
    // return res.status(200).json({ product }); {product } vayema product object ko vitra object hunxa 
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}



export const createProduct = async (req, res) => {
  const {
    title,
    description,
    category, brand,
    price, stock } = req.body;

  try {
    await Product.create({
      title,
      description,
      image: req.image,
      category,
      brand,
      price: Number(price),
      stock: Number(stock),
    });
    return res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err);
    fs.unlinkSync(`./uploads/${req.image}`);
    return res.status(400).json({ message: `${err}` });
  }
}


export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    category, brand,
    price, stock } = req.body;

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id' });

    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });

    if (req.newImage) {

      fs.unlinkSync(`./uploads/${isExist.image}`);
      await Product.findByIdAndUpdate(
        id,
        {
          title: title || isExist.title,
          description: description || isExist.description,
          image: req.newImage,
          category: category || isExist.category,
          brand: brand || isExist.brand,
          price: Number(price) || isExist.price,
          stock: Number(stock) || isExist.stock
        });

    } else {
      await Product.findByIdAndUpdate(id,
        {
          title: title || isExist.title,
          description: description || isExist.description,
          category: category || isExist.category,
          brand: brand || isExist.brand,
          price: Number(price) || isExist.price,
          stock: Number(stock) || isExist.stock
        });

    }

    return res.status(200).json({ message: 'success' });

  } catch (err) {
    console.log(err);
    fs.unlinkSync(`./uploads/${req.image}`);
    return res.status(400).json({ message: `${err}` });
  }
}





export const removeProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id' });

    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });

    await Product.findByIdAndDelete(id);
    fs.unlink(`./uploads/${isExist.image}`, (err) => {
      console.log(err);
      // OR if (err) console.log(err); yo halo vaney nullss aaudaina in consolema
    });


    return res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err);
    fs.unlinkSync(`./uploads/${req.image}`);
    return res.status(400).json({ message: `${err}` });
  }
}


// import Product from "../models/Product.js"





// export const getProducts = async (req, res) => {



//   try {

//     // search , sort, fields, operator, limit, page , skip

//     const excludesFields = ['sort', 'search', 'limit', 'fields', 'skip', 'page'];

//     const queryObj = { ...req.query };

//     //console.log(queryObj);

//     excludesFields.forEach((label) => delete queryObj[label]);


//     let qStr = JSON.stringify(queryObj);

//     qStr = qStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);// mongoose operator

//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;
//     const skip = (page - 1) * limit;

//     const response = await Product.find(JSON.parse(qStr)).skip(skip).limit(limit);

//     return res.status(200).json({ length: response.length, products: response });
//   } catch (err) {
//     return res.status(400).json({ err: `${err}` });
//   }
// }