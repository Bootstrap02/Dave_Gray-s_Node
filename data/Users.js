const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String, 
        required : true
    },
    
    roles : {
        USER : String, 
        EDITOR : String,
        ADMIN: String
    },

    password : {
        type: String, 
        required : true
}, 

refreshToken: {
    type: String
}
   
});

module.exports = mongoose.model('Users', userSchema);