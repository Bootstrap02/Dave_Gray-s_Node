// const Users = require('../data/Users');


// const handleLogOut = async (req, res) => {
//     const refreshToken = req.body.refreshToken
//     if (!refreshToken) {
//         return res.status(204);
//     }
    
//         try {
//             const foundUser = await Users.findOne({'refreshToken' : refreshToken}).exec();
//             if (!foundUser) {
//                 return res.status(201)
//             } else {  
//                 foundUser = '';
//                 res.status(201).json({'message': `User ${foundUser.username} logged out.`});
//                 const result = await foundUser.save();
            
//         } 
       
//      } catch (error) {
//             console.error('Error writing to file:', error);
//             res.status(500).json({ message: 'Internal server error.' });
//         }
    
// };

// module.exports = {handleLogOut};

const Users = require('../data/Users');

const handleLogOut = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    try {
        if (!refreshToken) {
            return res.status(400).json({ message: 'Bad request. Refresh token missing.' });
        }

        const foundUser = await Users.findOne({ 'refreshToken': refreshToken }).exec();

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized. User not found.' });
        } else {
            // Clear the refreshToken
            foundUser.refreshToken = null;
            await foundUser.save();
            res.status(200).json({ message: `User ${foundUser.username} logged out successfully.` });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { handleLogOut };
