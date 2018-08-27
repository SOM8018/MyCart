var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt= require("bcrypt-nodejs");

var userSchema = new Schema({
    email:{type: String, required : true, unique:true},
   password:{type: String, required : true},

});

userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
}
// userSchema.methods.validPassword = (password)=>{
//     return bcrypt.compareSync(password,this.password);
// }//real updated by som using "https://github.com/jaredhanson/passport-local/issues/158"
userSchema.methods.validPassword = function(password) {
    if(this.password != null) {
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};


module.exports= mongoose.model("User",userSchema);

