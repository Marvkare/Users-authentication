//ORM una forma de definir datos sin la nesesidad de saber como lo estamos guardando en la base de datos 

const { Schema } = require('mongoose')
let bcrypt = require('bcrypt-nodejs')
let mongoose = require('mongoose')

let userSchema = new Schema({
    email: String,
    password: String,

})

userSchema.methods.encryptPassword = (password)=>{
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('users', userSchema)