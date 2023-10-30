require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const DBconnect = require('./config/DBconnect');
const path = require('path');
const app = express()
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;


DBconnect();

// Middle-wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);
app.use(errorHandler);

app.use(cors(corsOptions));

// Routes

app.use('/', require('./routes/subdir'));
app.use('/users', require('./routes/authentication'));
app.use('/auth', require('./routes/authorization'));
app.use('/employees', require('./routes/api/employees'));   
app.use('/logout', require('./routes/logoutApi'));   


mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=>{console.log(`Server running on Port ${PORT}`)})
    
})

