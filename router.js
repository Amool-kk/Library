const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./database/model')
const controller = require('./controller/controller')
const path = require('path')

const router = express.Router()

router.get('/',auth,(req,res)=>{
    // const data = await User.find({email:req.user.email})
    console.log(req.user.email)
    res.status(200).json({message:"ok"})
})


router.post('/api/register',controller.register);

router.post('/api/login',controller.login);

router.get('/api/logout',controller.logout);

router.post('/api/create',auth,controller.create);

router.post('/api/delete',auth,controller.delete);

module.exports = router;