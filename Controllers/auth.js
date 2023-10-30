const Users = require('../data/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const handleLogIn = async (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    }
    if (!newUser.username || !newUser.password){
        return res.status(400).json({message: 'username and password are required.'})
    }   
    const foundUser = await  Users.findOne({username : newUser.username}).exec();

    if (!foundUser){
        return res.status(401).json({message: 'Unauthorized username detected!.'})
    }   
    
        const match = await bcrypt.compare(newUser.password, foundUser.password);
        if(match){
            const roles =  Object.values(foundUser.roles);
            const accessToken = jwt.sign({"username": foundUser.username, "roles": roles}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
            const refreshToken = jwt.sign({"username": foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

            foundUser.refreshToken = refreshToken 
            const result = await foundUser.save();
            res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})

            }else{
                res.status(401).json({message: 'Unauthorized Username or Password detected!.'})
             }   

};

module.exports = {handleLogIn}; 