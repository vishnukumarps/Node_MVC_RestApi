const Book=require('../models/book')



var books=[{"name":"book1"}];
const get=async(req,res,next)=>{


res.send(books)
};

const post=async(req,res,next)=>{
    const newBook= new Book({
        ...req.body
    })
    newBook.save();
    books.push(req.body)
    res.send(books)
};
    

module.exports = {
get,
post




};