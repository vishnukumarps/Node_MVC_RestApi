const Book = require('../models/book')
const {pdfHelperService}= require('../helper')
const {test2}=require('../helper/pdfHelper')
var books = [{ "name": "book1" }];
const get = async (req, res, next) => {
    res.send(books)
};


const post = async (req, res, next) => {
    try {
        pdfHelperService.test();
        const newBook = new Book({
            ...req.body
        })
        newBook.save();
        books.push(req.body)
        res.send(books)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
};
module.exports = {
    get,
    post
};