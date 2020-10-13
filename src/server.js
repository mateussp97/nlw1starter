const express = require("express")
const server = express()

//get the database
const db = require("./database/db.js")

//configura public folder
server.use(express.static("public"))

//enable the use of req.body in the application
server.use(express.urlencoded({extended: true}))

//using template engine
//pedindo o modolu nunjuck e atribuindo a constante nunjucks
//first argument: which folder are the htmls that will be used? | second argument: it is an object {which is the server, and does not save in cache memory}
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configure application paths
//page home
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um título"})
})
 
//receiving form data
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //insert data into the database
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro !")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {

    const search = req.query.search

    if(search == " "){
        //void search | show the page html with the data from database
        return res.render("search-results.html", {total: 0})
    }

    //get the data from database
    db.all(`SELECT * FROM places WHERE city = '${search}'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        //this refers to the collection point counter
        const total = rows.length

        //show the page html with the data from database
        return res.render("search-results.html", {places: rows, total: total})
    })
})

//Turn on the server
server.listen(3000)