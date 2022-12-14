const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const activeOrders = await Post.find({ orderStatus: 'pending' });
      const completedOrders = await Post.find({ orderStatus: 'complete' });

      res.render("profile.ejs", { activeOrder: activeOrders, completedOrder: completedOrders, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    console.log(req.body)
    try {
      await Post.create({
        orderName: req.body.orderName,
        size: req.body.size,
        koldDrinks: req.body.koldDrinks,
        hotDrinks: req.body.hotDrinks,
        teas: req.body.teas,
        milk: req.body.milk
      });
      console.log("Order has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },

  takeOrder: async (req, res) => {
    console.log(req.user)
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
       {
          orderStatus: 'complete',
          barista: req.user.userName
        }
      );
      console.log("Order up!"),
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },

  deleteOrder: async (req, res) => {
    try {
      await Post.remove({ _id: req.params.id });
      console.log("Deleted order!");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
