var express = require('express');
var router = express.Router();

var csrf = require("csurf");//Node.js CSRF protection middleware.
var csrfProtection = csrf();
router.use(csrfProtection);
var passport = require("passport");

  //SIGN OUT or log out  ROUTER
  router.get('/logout', isLoggedIn ,function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

   //PROFILEPAGE ROUTER
   router.get('/profile' ,isLoggedIn ,function(req, res, next) {
    res.render('user/profile',{title: 'Profile page'});
  });
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    router.use('/',notLoggedIn ,function(req,res,next){
     next();
    });
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //SIGN UP ROUTER
    router.get('/signup', function(req, res, next) {
        var messages = req.flash('error')
        res.render('user/signup',{title: 'Sign Up',csrfToken: req.csrfToken(),messages : messages,hasErrors:messages.length>0});
      });
      router.post('/signup', passport.authenticate('register',{
          successRedirect:'/user/profile',
          failureRedirect:'/user/signup',
          failureFlash:true,
        }));  
      //SIGN IN ROUTER
      router.get('/signin', function(req, res, next) {
        var messages = req.flash('error')
        res.render('user/signin',{title: 'Sign In',csrfToken: req.csrfToken(),messages : messages,hasErrors:messages.length>0});
      });
      router.post('/signin', passport.authenticate('login',{
          successRedirect:'/user/profile',
          failureRedirect:'/user/signin',
          failureFlash:true,
      }));

      module.exports = router;

      function isLoggedIn(req,res,next)
      {
        console.log("isLoggedIn "+req.isAuthenticated());
        if(req.isAuthenticated())
        {
          return next();
        }
        res.redirect('/');
      }
      //reverse 
      function notLoggedIn(req,res,next)
      {
        console.log("notLoggedIn "+req.isAuthenticated());
        if(!req.isAuthenticated())
        {
          return next();
        }
        res.redirect('/');
      }