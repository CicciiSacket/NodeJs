console.log('Server exe')

const express =  require('express')
const bodyParser = require ('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
module.exports = app.listen(3005)

const books = require('./books.json')
const students = require('./students.json')



//get request
app.get('/books', async (req,res)=>{
    try {
        const listBooks = await books
        res.json(listBooks)
    } catch (error) {
        res.sendStatus(400)
    }
})

app.get('/single_book', async (req,res)=>{
    try {
        const singleBook = await books.find(item => item.title === String(req.body.title))
        res.json(singleBook)
    } catch (error) {
        res.sendStatus(400)
    }
})

app.get('/borrowed_books', async (req,res)=>{
    try {
        const borrowedBooks = await books.filter(item => item.borrowed === true)
        res.json(borrowedBooks)
    } catch (error) {
        res.sendStatus(400)
    }
})

app.get('/students',async (req,res)=>{
    try {
        const listStudents = await students
        res.json(listStudents)
    } catch (error) {
        res.sendStatus(400)
    }
})

app.get('/single_student', async (req,res)=>{
    try {
        const singleStudent = await students.find(item=> item.ID === req.body.ID)
        res.json(singleStudent)
    } catch (error) {
        res.sendStatus(400)
    }
})

app.get('/students_books', async (req,res)=>{
    try {
        const haveBooks = await students.filter(item=> item.haveBook === true)
        res.json(haveBooks)
    } catch (error) {
        res.sendStatus(400)
    }
})

//post request
app.post('/students', async (req,res)=>{
    try {
        const studentsTotal = await students
        const newStudent = {name:String(req.body.name), surname:String(req.body.surname), district:String(req.body.district),ID:Number(req.body.ID),haveBook:Boolean(req.body.haveBook)} 
        if (studentsTotal.find(item =>item.ID === newStudent.ID )){
            res.json({message:"Already exist"})
        }
        else{
            studentsTotal.push(newStudent)
            res.json(students) 
        }
    } catch (error) {
        res.sendStatus(400)
    }
})

app.post('/books', async (req,res)=>{
    try {
        const booksTotal = await books
        const newBook = {title:String(req.body.title), number:Number(req.body.number), borrowed:Boolean(req.body.borrowed)} 
        if (booksTotal.find(item => item.number === newBook.number)) {
            res.json({message:"Already exist"})
        }
        else{
            booksTotal.push(newBook)
            res.json(books)
        }
    } catch (error) {
        res.sendStatus(400)
    }
})

//delete request
app.delete('/students', async (req,res)=>{
    try {
        const studentsTotal = await students
        const support = []
        if (studentsTotal) {
            let filtered = studentsTotal.filter(item => item.ID !== Number(req.body.ID))
            res.json(support.concat(filtered))
        }
        else{
            res.json({message: "not exist"})
        }
    } catch (error) {
        res.sendStatus(404)
    }
})

app.delete('/books', async (req,res)=>{
    try {
        const booksTotal = await books
        const support = []
        if (booksTotal) {
            let filtered = booksTotal.filter(item => item.number !== Number(req.body.number))
            res.json(support.concat(filtered))
        }
        else{
            res.json({message: "not exist"})
        }
    } catch (error) {
        res.sendStatus(404)
    }
})