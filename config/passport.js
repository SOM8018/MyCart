var passport = require("passport");//
var User = require("../models/user");//
var LocalStrategy = require("passport-local").Strategy;//




    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user);
        });
    });
//     //register strategy

    passport.use('register',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
    (req,email,password,done)=>{
        //check validator then check user exist or not
        req.checkBody('email','invalid email').notEmpty().isEmail();
        req.checkBody('password','invalid password').notEmpty().isLength({min:4});
        var errors = req.validationErrors();
        
        if(errors)
        {
            
            var messages=[];
            errors.forEach((error)=>{
                messages.push(error.msg);
            });
            return done(null,false,req.flash('error',messages));
        }
        //check user exist or not in databse
        User.findOne({'email':email},(err,user)=>{
            if(err) { return done(err); }
            if(user){
                    return done(null,false,{message:'Email already exist, Try Forgot Password'});
    
            }
            var newUser= new User();
                newUser.email= email;
                newUser.password=newUser.encryptPassword(password);
                newUser.save((err,result)=>{
                    if(err)
                        {
                            throw err
                        }
                    return done(null,newUser);
        
                });
        });

    }));



    //login startegy
    passport.use('login',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },(req,email,password,done)=>{

        req.checkBody('email','Invalid email').notEmpty();
        req.checkBody('password','Invalid password').notEmpty();
        var errors = req.validationErrors();
        
        if(errors)
        {
            
            var messages=[];
            errors.forEach((error)=>{
                messages.push(error.msg);
            });
            return done(null,false,req.flash('error',messages));
        }
        
        User.findOne({'email':email},(err,user)=>{
            
            if(err) {console.log("if one error founnd"); return done(err); }//If eror found
            if(!user){
                    console.log("if email not found");
                    return done(null,false,{message:'No User Found ! Check your Credentials'});//if email not found
    
            }
            if(!user.validPassword(password)){
                console.log("if password not matches");
                return done(null,false,{message:'Wrong Password ! Try again Please'});//if password not matches

            }
            return done(null, user);
        });
        
    
    }));

