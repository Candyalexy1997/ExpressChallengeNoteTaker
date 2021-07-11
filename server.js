const express = require("express")
const uuid = require("uuid")
const fs = require("fs")
const path = require("path")
const port = process.env.PORT || 3000
const server = express()
const db = require("./db/db.json")
server.use(express.json())
server.use(express.static("public"))
server.listen(port)

server.get("/notes", function (req, res) {
    res.sendFile(path.join(process.cwd(), "./public/notes.html"))
})
server.get("/api/notes", function (req, res) {
    fs.readFile(path.join(process.cwd(), "./db/db.json"), function (err, data) {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(JSON.parse(data))
    })
})
server.post("/api/notes", function (req, res) {
    const newNote = req.body
    newNote.id = uuid.v4()
    db.push(newNote)
    fs.writeFile(path.join(process.cwd(), "./db/db.json"), JSON.stringify(db), function (err) {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(newNote)
    })
})







server.get("*", function (req, res) {
    res.sendFile(path.join(process.cwd(), "./public/index.html"))
})


