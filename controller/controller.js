const userDb = require('../database/model');
const bcrypt = require('bcrypt');
const books = require('../database/booksmodel')

const getbooksData = async (email)=>{
    const result = await books.find({id:email});
    return result;
}

exports.create = async (req,res)=>{
    const {name,image,author,pages,price} = req.body;
    
    if(!name || !image || !author || !pages || !price){
        res.status(400).send({message : "All detials are required!"});
    }

    try {
        const newBook = new books({
            id: req.user.email,
            name,
            image,
            author,
            pages,
            price
        })
        const result = await newBook.save();

        res.status(200).send({message : "Your book is created!"})
    } catch (error) {
        res.status(400).send({message : error.message || "Some error occured please try again!"});
    }    
}

exports.delete = async (req,res)=>{
    const {name} = req.body;

    if(!name){
        res.status(400).send({message : "Name of book can not empty!"})
    }

    const whichBook = await books.find({name: name});

    try{
        const deleteBook = await books.deleteOne(
            {"id" : req.user.email, "name" : name}
        )

        res.status(200).send({message : "Your book is deleted"})
    }catch(err){
        res.status(400).send({message : err.message || "Some error occured please try again"})
    }
}


exports.register = (req,res)=>{
    if(!req.body){
        res.status(400).send({message : "Request can not be empty!"})
    }
    const user = new userDb({
        email : req.body.email,
        password : req.body.password
    })

    // const token = await user.genrateToken();

    user.save(user).then(data =>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message : err.message || "Some error occured please try again!"})
    })
}


exports.login = async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).send({message : "Request can not be empty!"})
    }

    const userExist = await userDb.findOne({email:email})

    if(userExist){
        const isMatch = await bcrypt.compare(password, userExist.password)
        if(isMatch){
            const token = await userExist.genrateToken();
            res.cookie('jwt',token,{
                httpOnly : true
            })
            const results = await userExist.save()
            res.status(200).send({message : "Login Successfuly"});
        }else{
            res.status(400).send({message : "User details is not correct!"});
        }
    }else{
        res.status(400).send({message : "User not found!"});
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('jwt')
    res.status(200).send('user logout')
}