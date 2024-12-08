import path from 'path';


const supportedExts = ['.png', '.jpg', '.webp', '.gif', '.jpeg'];
export const fileCheck = (req, res, next) => {

  const file = req.files?.image;

  if (!file) return res.status(400).json({ message: 'please provide valid image file' });

  const type = path.extname(file.name);

  if (!supportedExts.includes(type)) return res.status(400).json({ message: 'please provide valid image file' });

  file.mv(`./uploads/${file.name}`, (err) => {

    if (err) return res.status(400).json({ message: err.message });
    req.image = file.name;
    next();
  })

}

export const updateFileCheck = (req, res, next) => {

  const file = req.files?.image;

  if (!file) return next();

  const type = path.extname(file.name);

  if (!supportedExts.includes(type)) return res.status(400).json({ message: 'please provide valid image file' });



  file.mv(`./uploads/${file.name}`, (err) => {

    if (err) return res.status(400).json({ message: err.message });
    req.newImage = file.name;
    return next();
  })

}


// export const fileCheck = (req, res, next) => {

//   const file = req.files?.image;

//   // file.mv(`./uploads/Mern.png`, (err) => {
//   //   console.log(err);
//   // })
//   file.mv(`./uploads/${file.name}`, (err) => {
//     console.log(err);
//   })

//   next();

// }
// export const fileCheck = (req, res, next) => {

//   const file = req.files?.image;

//   file.mv(`./uploads/Mern.png`, (err) => {
//     console.log(err);
//   })

//   next();

// }




// export const somware = (req, res, next) => {
//   console.log(req.body);

//   if (req.body.email) {
//     return next();
//   }
//   return res.status(400).json({ message: "file not found" });

// }