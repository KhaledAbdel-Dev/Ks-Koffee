const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  orderName: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    require: true,
  },
  koldDrinks: {
    type: String,
    require: true,
  },
  hotDrinks: {
    type: String,
    require: true,
  },
  teas: {
    type: String,
    require: true,
  },
  milk: {
    type: String,
    require: true,
  },
  orderStatus: {
    type: String,
    require: true,
    default: 'pending'
  },
  barista: {
    type: String,
    required: true,
    default: ' '
  }

});

module.exports = mongoose.model("koffeeOrders", PostSchema);
