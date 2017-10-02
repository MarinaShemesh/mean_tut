const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
username:{ type: String, 
           lowercase: true,
           required: true,
           unique: true
        },
password: { type: String,
            required: true
      },
email: { type: String,
         lowercase: true,
         required: true,
         unique: true
       }

});

UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, saltRounds, function (err, hash){
    if(err) return next(err);
    user.password = hash;
    next();
   });
 });

  UserSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password, this.password);//compare given pw and pw in the db
};

  module.exports = mongoose.model('User', UserSchema);