const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Please set a unique name"],
        minLength: [3, "Please set a minimum length 3 characters"],
        maxLength: [100, "Could not support more than 100 characters"],
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: [0, "couldn't set less than 0"],
      },
      unit: {
        type: String,
        required: true,
        enum: {
          values: ["kg", "liter", "pcs"],
          message: "unit value can't be {value}, must be kg/liter/pcs",
        },
      },
      quantity: {
        type: Number,
        required: true,
        min: [0, "quantity can't be negative"],
        validate: {
          validator: (value) => {
            const isInteger = Number.isInteger(value);
            if (isInteger) {
              return true;
            } else {
              return false;
            }
          },
        },
        message: "quantity must be a integer value",
      },
      status: {
        type: String,
        required: true,
        enum: {
          values: ["In-stock", "Out-of-stock", "discontinued"],
          message: "status can't be {value}",
        },
      },
    },
    {
      timesstamps: true,
    }
  );
  
  //mongoose middleware for saving data : pre/post
  
  productSchema.pre("save", function (next) {
    console.log("before saving product");
    if (this.quantity === 0) {
      this.status = "Out-of-stock";
    }
  
    next();
  });
  productSchema.post("save", function (doc, next) {
    console.log("after saving product");
    next();
  });
  
  const Product = mongoose.model("Product", productSchema);
  
  module.exports=Product;