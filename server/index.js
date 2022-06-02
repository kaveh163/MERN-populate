const express = require('express');
const mongoose = require('mongoose');
const myObjectId = require('bson-objectid')
const path = require('path');
const PORT = process.env.PORT || '3001';
const User = require('./Model/User');
const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//get Routes
app.get('/api', function (req, res) {
    res.json({message: "return from server"})
});
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build/', 'index.html'));
})
app.post('/api/register', async function (req, res) {
    console.log('req.body', req.body);
    let friends = req.body.friends;
    
    // const user = await User.findOne({username: username}).exec();
    // if(user) {
    //     for(const friend of friends) {

    //     }
    // }
    res.json({'message' : 'Succefully registered'});

})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})