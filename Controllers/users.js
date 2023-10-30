const Users = require('../data/Users');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    }
    if (!newUser.username || !newUser.password){
        return res.status(400).json({message: 'username and password are required.'})
    }   
    const duplicate = await  Users.findOne({username : newUser.username}).exec();
    if (duplicate){
        return res.status(400).json({message: 'username already exists.'})
    }   
    try{
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;
        const result = await Users.create( {
            "username": newUser.username,
            "roles": {
                "USER" : "user"
            },
            "password": newUser.password
        })

        console.log(result);
        
        res.status(201).json({'message': `New User ${newUser.username} created!.`});
    }catch (err){
        res.status(500).json({message: `Error ${err} creating user.`})
    }
};

module.exports = {handleNewUser};