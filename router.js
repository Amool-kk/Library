const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./database/model')
const controller = require('./controller/controller')
const path = require('path');
const books = require('./database/booksmodel');

const router = express.Router()

router.get('/',auth,(req,res)=>{
    // const data = await User.find({email:req.user.email})
    console.log(req.user.email)
    res.status(200).json({message:"ok"})
})

// for all books of login user
router.get('/api/books',auth,controller.read);

// for registeration (require email and password)
router.post('/api/register',controller.register);

// for login (require email and password)
router.post('/api/login',controller.login);

router.get('/api/logout',controller.logout);

// for create new book (require the details of book)
router.post('/api/create',auth,controller.create);

// for delete the book (require _id of that book)
router.post('/api/delete',auth,controller.delete);

// for update the book (require _id of that book other those details of book for update)
router.post('/api/update',auth,controller.update);

// for one book of login user (require _id of that book)
router.post('/api/book',auth,controller.readOne);

module.exports = router;