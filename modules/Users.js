//require thư viện mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// tạo ra quan hệ Users
const Users = new Schema({
    name: 
    {
        type:String,
        require:true
    },
    address:
    {
        type:String,
        require:true
    },
    
    role: 
    {
        type:String,
        require:true
    },
    
    email: 
    {
        type:String,
        require:true
    },
    
    password: 
    {
        type:String,
        require:true
    },
    
    phone: 
    {
        type:String,
        require:true
    },
    
    status: 
    {
        type:String,
        require:true
    },
    
    gender: 
    {
        type:String,
        require:true
    },
    
    identification: 
    {
        type:String,
        require:true
    },
    
    avatarUrl: 
    {
        type:String,
        require:true
    },
    
    dateAtWork: {
        type:Date,
        require:true
    },
    
    dateAtBirth: {
        type:Date,
        require:true
    },
    
    resetPasswordToken: 
    {
        type:String,
        require:true
    },
    
    token: String
   
},{
    collection:'Users'
}

);
//tạo ra biến model
 const UsersModel =mongoose.model('Users',Users);

 module.exports = (db) => {
    if (!db.models.Users)
        return db.model('Users', UsersSchema);
    return db.models.Users;
 }

