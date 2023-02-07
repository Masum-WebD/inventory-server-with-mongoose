const Product =require("../modules/Products");
const { getProductsService, saveProductService } = require("../services/products.service");
module.exports.getProducts =async (req, res) => {
    try {
      // const product = await (await Product.where("name").equals(/\w/).where(quantity)).gt(100).lt(600).limit(2).sort({quantity:-1})
      // res.send(product)
  
      const products = await getProductsService()
      res.status(200).json({
        status:"success",
        message:"Product is getting",
        data: products
      })
    } catch (error) {
      res.status(404).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
  module.exports.saveProducts = async (req, res, next) => {
    try {
      const product = await saveProductService(req.body)
  
      const result = await product.save();
      res.status(200).json({
        status: "success",
        message: "data saved successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: "data not saved successfully",
        data: error.message,
      });
    }
  }