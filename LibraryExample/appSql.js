console.log('Server exe')

const mysql = require('mysql');
const express =  require('express')
const bodyParser = require ('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
module.exports = app.listen(3008)


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port:8889,
    database:"library"
});


createDb = "CREATE DATABASE library"
app.get('/library/create_db', async (req,res)=>{//creazione database
    try {
        con.connect((err) => {
            if (err) throw (err);
            con.query(createDb,(err) => {
                if (err) throw (err);
            });
            res.json({message:"database created"})
        })
    } catch (error) {
        res.sendStatus(400)
    }
})


createTableStudents = "CREATE TABLE students (name VARCHAR(255) NOT NULL , surname VARCHAR(255) NOT NULL, district VARCHAR(255) NOT NULL, ID INT NOT NULL PRIMARY KEY, HaveBooks INT NOT NULL)"
app.get('/library/students_table', async (req,res)=>{//creazione tabella students 
    try {
        con.connect((err)=> {
            if (err) throw (err);
            con.query(createTableStudents,(err)=> {
                if (err) throw (err);
            });
            res.json({message:"table created"})
        })
    } catch (error) {
        res.sendStatus(400)
    }
})


createTableBooks = "CREATE TABLE books (title VARCHAR(255) NOT NULL, number INT NOT NULL PRIMARY KEY, borrowed INT)"
app.get('/library/books_table', async (req,res)=>{//creazione tabella students 
    try {
        con.connect((err)=> {
            if (err) throw (err);
            con.query(createTableBooks,(err)=> {
                if (err) throw (err);
            });
            res.json({message:"table created"})
        })
    } catch (error) {
        res.sendStatus(400)
    }
})

app.post('/library/students_insert', async (req,res)=>{//inserire studente in db
    try {
        con.connect((err)=> {
            if (err) throw (err);
            con.query(`INSERT INTO students VALUES ('${req.body.name}','${req.body.surname}','${req.body.district}', ${req.body.ID}, ${req.body.HaveBooks})`,(err)=> {
                if (err) throw (err);
            });
            res.json({message:" students insert into table"})
        })
    } catch (error) {
        res.sendStatus(400)
    }
})

app.post('/library/books_insert', async (req,res)=>{//inserire libro in db
    try {
        con.connect((err)=> {
            if (err) throw (err);
            con.query(`INSERT INTO books VALUES ('${req.body.title}','${req.body.number}','${req.body.borrowed}')`,(err)=> {
                if (err) throw (err);
            });
            res.json({message:" books insert into table"})
        })
    } catch (error) {
        res.sendStatus(400)
    }
})




