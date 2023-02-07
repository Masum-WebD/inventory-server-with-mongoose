const Product =require("../modules/Products")
module.exports.getProductsService =async()=>{
    const result = await Product.find({})
    return result
}
module.exports.saveProductService=async(data)=>{
    const result =  new Product(data);
    return result
}