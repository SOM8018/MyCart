var express = require('express');
var router = express.Router();
var Product = require("../models/product");
var Cart = require("../models/cart");


  /* GET home page. */
 router.get('/', function(req, res, next) {
    var products = Product.find((err,docs)=>{
      var productChunks = [];
      var chunkSize = 3;
      for(var i =0;i<docs.length;i++){
        productChunks.push(docs.slice(i, i + chunkSize));
      }
      res.render('shop/index', { title: 'Shopping Cart' ,products:productChunks});//pass {products} var to index.hbs
    
    });
    
  });
  //add to cart routes
  router.get("/add-to-cart/:id",(req,res,next)=>{

      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart : {} );
      Product.findById(productId,(err,product)=>{
          if(err)
          {
            res.redirect("/");
          }
          cart.add(product,product.id);
          req.session.cart = cart;
          console.log( req.session.cart);
          res.redirect("/");
      });
  });
  //shop-cart routes
  router.get("/shopping-cart",(req,res,next)=>{
    if(!req.session.cart)
    {
      return res.render('shop/shopping-cart',{products:null});//if there is no product in the cart 
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products:cart.generateArray(),totalPrice: cart.totalPrice});

  });
  //checkout routes
  router.get('/checkout',(req,res,next)=>{
    if(!req.session.cart)
    {
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout',{total: cart.totalPrice});
  });
  

  module.exports = router;
//signin router
  // router.get('/user/signin', function(req, res, next) {
    
  //     res.json({message:req.flash('loginMessage')});
    
  // });
  // router.post('/user/signin',passport.authenticate('login',{
    
  //     successRedirect:'/user/profile',
  //     failureRedirect:'/user/signin',
  //     failureFlash:true,
  //   }));





// router.post('/user/signup',passport.authenticate('register',{
    
    //   successRedirect:'/user/profile',
    //   failureRedirect:'/user/signup',
    //   failureFlash:true,
    // }));


  // router.get('logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/user/signin');

  // });